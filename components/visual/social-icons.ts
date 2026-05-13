import { Code2, Globe, Mail, MessageCircle, MessageSquare, Phone, Share2, type LucideIcon } from "lucide-react";

const icons: Record<string, LucideIcon> = {
  github: Code2,
  linkedin: Share2,
  twitter: MessageSquare,
  mail: Mail,
  website: Globe,
  discord: MessageCircle,
  phone: Phone,
};

export function socialIcon(name: string): LucideIcon {
  return icons[name] ?? Code2;
}
