interface LeftPanelProps {
  title: string;
  subtitle: string;
}

const LeftPanel: React.FC<LeftPanelProps> = ({ title, subtitle }) => {
  return (
    <div className="hidden lg:flex lg:w-1/2 relative bg-blue-600 items-center justify-center overflow-hidden">
      <div className="relative z-10 px-12 text-white">
        <h2 className="text-4xl font-bold mb-4">{title}</h2>
        <p className="text-xl">{subtitle}</p>
      </div>
      <div className="absolute inset-0 bg-gradient-to-br from-blue-500 to-blue-700">
        <div className="absolute inset-0" style={{
          backgroundImage: `radial-gradient(circle at 25% 25%, rgba(255,255,255,0.2) 0%, transparent 50%),
                           radial-gradient(circle at 75% 75%, rgba(255,255,255,0.2) 0%, transparent 50%)`
        }}></div>
      </div>
    </div>
  );
};

export default LeftPanel;