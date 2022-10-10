interface Props extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  className?: string | undefined;
}

const CTA = (props: Props) => {
  const { className } = props;
  return (
    <button
      {...props}
      className={`w-full px-4 py-2 tracking-wide text-white transition-colors duration-200
   transform bg-sentBgColor rounded-lg hover:bg-sentBgColor focus:outline-none focus:bg-sentBgColor disabled:bg-opacity-50 disabled:cursor-not-allowed ${className ? className : ""
        }`}
    >
      {props.children}
    </button>
  );
};
export default CTA;
