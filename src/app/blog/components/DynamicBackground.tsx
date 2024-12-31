const DynamicBackground = () => {
    return (
        <div className='fixed inset-0 h-screen w-screen overflow-hidden -z-50'>
            <div className={`
        absolute inset-0 w-full h-full
        bg-radient-[169.40%_89.55%_at_94.76%_6.29%]
        from-red-500
        via-red-400/15
        to-transparent
        transition-all duration-150
      `}
            />
        </div>
    );
};

export default DynamicBackground;
