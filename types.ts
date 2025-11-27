
export interface EventType {
  id: string;
  slug: string;
  title: string;
  startDate: Date;
  endDate: Date;
  location: string;
  description: string;
  agenda: string[];
  image: string;
  responsibleName?: string;
  contactPhone?: string;
  contactEmail?: string;
  website?: string;
}
