import { LucideIcon } from "lucide-react";

interface CategoryButtonProps {
  icon: LucideIcon;
  label: string;
  onClick: () => void;
  active?: boolean;
}

const CategoryButton = ({ icon: Icon, label, onClick, active }: CategoryButtonProps) => {
  return (
    <button
      onClick={onClick}
      className={`flex flex-col items-center gap-1.5 px-4 py-3 rounded-xl border transition-all duration-200 text-sm font-medium min-w-[80px] ${
        active
          ? "border-primary bg-primary-light text-primary shadow-primary"
          : "border-border bg-card text-muted-foreground hover:border-primary/40 hover:text-foreground hover:bg-surface"
      }`}
    >
      <Icon size={20} strokeWidth={1.5} />
      <span>{label}</span>
    </button>
  );
};

export default CategoryButton;
