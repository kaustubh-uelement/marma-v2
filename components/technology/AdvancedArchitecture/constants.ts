import {
  ShieldAlert,
  TrendingUp,
  Network,
  Bot,
  Zap,
  Cloud,
  Key,
  Shield,
  Monitor,
  Smartphone,
  LucideIcon
} from "lucide-react";

export interface OrbitingNodeData {
  id: number;
  label: string;
  pos: { left: string; top: string };
  layout: string;
  icon: LucideIcon;
}

export interface BottomJunctionData {
  id: number;
  pos: { left: string; top: string };
  icon: LucideIcon;
}

export interface BottomCardData {
  id: number;
  title: string;
  label: string;
  img: string;
  pos: { left: string; top: string };
}

// Data for Nodes
export const orbitingNodes: OrbitingNodeData[] = [
  { id: 1, label: "Real-Time Scam Detector\n", pos: { left: "22%", top: "50%" }, layout: "row-reverse", icon: ShieldAlert },
  { id: 2, label: "Predictive Risk-\nScoring", pos: { left: "30%", top: "38%" }, layout: "row-reverse", icon: TrendingUp },
  { id: 3, label: "Multi-stage Attack\nCo-relation", pos: { left: "37.2%", top: "24.4%" }, layout: "row-reverse", icon: Network },
  { id: 4, label: "AI SOC Analyst", pos: { left: "50%", top: "18%" }, layout: "col", icon: Bot },
  { id: 5, label: "AI/ML Powered\nAnomaly Detection", pos: { left: "62.8%", top: "24.4%" }, layout: "row", icon: Zap },
  { id: 6, label: "Cloud Security Services", pos: { left: "74%", top: "38%" }, layout: "row", icon: Cloud },
  { id: 7, label: "Adaptive Access\nPolicies", pos: { left: "78%", top: "50%" }, layout: "row", icon: Key },
];

export const bottomJunctions: BottomJunctionData[] = [
  { id: 21, pos: { left: "26%", top: "64.4%" }, icon: Shield },
  { id: 22, pos: { left: "50%", top: "64.4%" }, icon: Monitor },
  { id: 23, pos: { left: "74%", top: "64.4%" }, icon: Smartphone },
];
export const mobileBottomJunctions: BottomJunctionData[] = [
  { id: 21, pos: { left: "17%", top: "64.4%" }, icon: Shield },
  { id: 22, pos: { left: "50%", top: "64.4%" }, icon: Monitor },
  { id: 23, pos: { left: "83%", top: "64.4%" }, icon: Smartphone },
];

export const bottomCards: BottomCardData[] = [
  {
    id: 11,
    title: "Edge AI Agents",
    label: "Plug-n-Play Firewall Solutions",
    img: "/images/product/SafeEnterprise4001.webp",
    pos: { left: "26%", top: "82.4%" },
  },
  {
    id: 12,
    title: "Edge AI Agents",
    label: "Endpoint Protection Software",
    img: "/images/product/software/marmaAgent.webp",
    pos: { left: "50%", top: "82.4%" },
  },
  {
    id: 13,
    title: "Edge AI Agents",
    label: "Cybersecurity Mobile App",
    img: "/images/product/software/mobile_app_1.webp",
    pos: { left: "74%", top: "82.4%" },
  },
];
export const mobileBottomCards: BottomCardData[] = [
  {
    id: 11,
    title: "Edge AI Agents",
    label: "Plug-n-Play Firewall Solutions",
    img: "/images/product/SafeEnterprise4001.webp",
    pos: { left: "15%", top: "82.4%" },
  },
  {
    id: 12,
    title: "Edge AI Agents",
    label: "Endpoint Protection Software",
    img: "/images/product/software/marmaAgent.webp",
    pos: { left: "50%", top: "82.4%" },
  },
  {
    id: 13,
    title: "Edge AI Agents",
    label: "Cybersecurity Mobile App",
    img: "/images/product/software/mobile_app_1.webp",
    pos: { left: "85%", top: "82.4%" },
  },
];
