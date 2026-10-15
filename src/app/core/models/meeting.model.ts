/** A trainer-scheduled video meeting with one student, backed by an embedded Jitsi call room. */
export interface Meeting {
  id: string;
  hostId: string;
  studentId: string;
  title: string;
  scheduledAt: string;
  roomUrl: string;
  canceledAt: string | null;
  createdAt: string;
  host: { id: string; firstName: string; lastName: string };
  student: { id: string; firstName: string; lastName: string };
}
