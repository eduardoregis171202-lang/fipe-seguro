const LoadingSpinner = ({ text = "Carregando..." }: { text?: string }) => (
  <div className="flex flex-col items-center justify-center py-12 gap-4">
    <div className="relative w-12 h-12">
      <div className="absolute inset-0 rounded-full border-2 border-secondary" />
      <div className="absolute inset-0 rounded-full border-2 border-transparent border-t-primary animate-spin" />
      <div className="absolute inset-2 rounded-full border-2 border-transparent border-b-accent animate-spin" style={{ animationDirection: 'reverse', animationDuration: '0.8s' }} />
    </div>
    <p className="text-sm text-muted-foreground font-medium">{text}</p>
  </div>
);

export default LoadingSpinner;
