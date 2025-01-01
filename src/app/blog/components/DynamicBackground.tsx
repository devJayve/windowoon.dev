const DynamicBackground = () => {
  return (
    <div className="fixed inset-0 -z-50 h-screen w-screen overflow-hidden">
      <div
        className={`absolute inset-0 size-full from-red-400 via-red-400/30 to-transparent transition-all duration-150 bg-radient-[169.40%_89.55%_at_94.76%_6.29%]`}
      />
    </div>
  );
};

export default DynamicBackground;
