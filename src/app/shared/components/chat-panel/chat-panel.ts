import { Component, DestroyRef, OnInit, computed, inject, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { AuthService } from '../../../core/services/auth.service';
import { ChatService } from '../../../core/services/chat.service';
import { ChatContact, ChatMessage } from '../../../core/models/chat.model';

/** How often the active thread polls for new messages — no WebSocket layer exists yet, so this is the simplest reliable "feels live" option. */
const POLL_INTERVAL_MS = 4000;

@Component({
  selector: 'app-chat-panel',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './chat-panel.html',
  styleUrl: './chat-panel.scss',
})
export class ChatPanel implements OnInit {
  private auth = inject(AuthService);
  private chat = inject(ChatService);
  private destroyRef = inject(DestroyRef);

  readonly currentUserId = computed(() => this.auth.currentUser()?.id ?? '');
  readonly isStaff = computed(() => this.auth.currentUser()?.role === 'trainer' || this.auth.currentUser()?.role === 'coach');

  readonly contacts = signal<ChatContact[]>([]);
  readonly contactsLoading = signal(true);
  readonly activeContactId = signal<string | null>(null);
  readonly messages = signal<ChatMessage[]>([]);
  readonly draft = signal('');
  readonly sending = signal(false);

  readonly activeContact = computed(() => this.contacts().find((c) => c.id === this.activeContactId()) ?? null);

  ngOnInit(): void {
    this.loadContacts();
    const intervalId = setInterval(() => this.pollActiveThread(), POLL_INTERVAL_MS);
    this.destroyRef.onDestroy(() => clearInterval(intervalId));
  }

  private loadContacts(): void {
    this.chat.getConversations().subscribe((contacts) => {
      this.contacts.set(contacts);
      this.contactsLoading.set(false);
    });
  }

  selectContact(contact: ChatContact): void {
    this.activeContactId.set(contact.id);
    this.messages.set([]);
    this.chat.getMessages(contact.id).subscribe((messages) => this.messages.set(messages));
    if (contact.unreadCount > 0) {
      this.chat.markRead(contact.id).subscribe(() => {
        this.contacts.update((list) => list.map((c) => (c.id === contact.id ? { ...c, unreadCount: 0 } : c)));
      });
    }
  }

  private pollActiveThread(): void {
    const contactId = this.activeContactId();
    if (!contactId) return;
    const latest = this.messages()[this.messages().length - 1];
    this.chat.getMessages(contactId, latest?.createdAt).subscribe((newMessages) => {
      if (newMessages.length > 0) this.messages.update((list) => [...list, ...newMessages]);
    });
  }

  sendMessage(): void {
    const contact = this.activeContact();
    const body = this.draft().trim();
    if (!contact || !body || this.sending()) return;

    this.sending.set(true);
    this.chat.sendMessage(contact.id, body).subscribe({
      next: (message) => {
        this.messages.update((list) => [...list, message]);
        this.draft.set('');
        this.sending.set(false);
        this.contacts.update((list) =>
          list.map((c) => (c.id === contact.id ? { ...c, lastMessage: body, lastMessageAt: message.createdAt } : c))
        );
      },
      error: () => this.sending.set(false),
    });
  }

  initials(contact: ChatContact): string {
    return `${contact.firstName.charAt(0)}${contact.lastName.charAt(0)}`.toUpperCase();
  }
}
