import { Injectable } from '@angular/core';

/**
 * Thin wrapper around localStorage acting as a stand-in "database".
 * Every other service talks to collections through here instead of
 * touching localStorage directly, so swapping this for real HTTP calls
 * later only means rewriting the feature services, not any component.
 */
@Injectable({ providedIn: 'root' })
export class DatabaseService {
  private readonly prefix = 'sela_';

  getAll<T>(collection: string): T[] {
    const raw = localStorage.getItem(this.key(collection));
    return raw ? (JSON.parse(raw) as T[]) : [];
  }

  saveAll<T>(collection: string, records: T[]): void {
    localStorage.setItem(this.key(collection), JSON.stringify(records));
  }

  getById<T extends { id: string }>(collection: string, id: string): T | undefined {
    return this.getAll<T>(collection).find((record) => record.id === id);
  }

  insert<T extends { id: string }>(collection: string, record: T): T {
    const records = this.getAll<T>(collection);
    records.push(record);
    this.saveAll(collection, records);
    return record;
  }

  update<T extends { id: string }>(collection: string, id: string, patch: Partial<T>): T | undefined {
    const records = this.getAll<T>(collection);
    const index = records.findIndex((record) => record.id === id);
    if (index === -1) return undefined;
    records[index] = { ...records[index], ...patch };
    this.saveAll(collection, records);
    return records[index];
  }

  upsert<T extends { id: string }>(collection: string, record: T): T {
    const records = this.getAll<T>(collection);
    const index = records.findIndex((r) => r.id === record.id);
    if (index === -1) {
      records.push(record);
    } else {
      records[index] = record;
    }
    this.saveAll(collection, records);
    return record;
  }

  remove(collection: string, id: string): void {
    const records = this.getAll<{ id: string }>(collection).filter((record) => record.id !== id);
    this.saveAll(collection, records);
  }

  /** Removes every record matching a predicate — e.g. clearing one student's logs for one module. */
  removeWhere<T>(collection: string, predicate: (record: T) => boolean): void {
    const records = this.getAll<T>(collection).filter((record) => !predicate(record));
    this.saveAll(collection, records);
  }

  generateId(): string {
    return (crypto as { randomUUID?: () => string }).randomUUID?.() ?? `id_${Date.now()}_${Math.random().toString(36).slice(2, 9)}`;
  }

  getFlag(name: string): boolean {
    return localStorage.getItem(this.key(name)) === 'true';
  }

  setFlag(name: string, value: boolean): void {
    localStorage.setItem(this.key(name), String(value));
  }

  getString(name: string): string | null {
    return localStorage.getItem(this.key(name));
  }

  setString(name: string, value: string): void {
    localStorage.setItem(this.key(name), value);
  }

  removeKey(name: string): void {
    localStorage.removeItem(this.key(name));
  }

  private key(name: string): string {
    return `${this.prefix}${name}`;
  }
}
