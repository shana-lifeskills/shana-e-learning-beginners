/** One message in a trainer<->student conversation. */
export interface ChatMessage {
  id: string;
  senderId: string;
  recipientId: string;
  body: string;
  readAt: string | null;
  createdAt: string;
}

/** A conversation partner in the chat contact list — a student for staff, a staff member for a student. */
export interface ChatContact {
  id: string;
  firstName: string;
  lastName: string;
  profileImage: string | null;
  role: 'student' | 'instructor' | 'admin';
  lastMessage: string | null;
  lastMessageAt: string | null;
  unreadCount: number;
}
