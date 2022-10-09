import { forwardRef } from 'react';

const Field = forwardRef((props: React.InputHTMLAttributes<HTMLInputElement>, ref: any) => {
  return (
    <input
      {...props}
      className="block w-full px-4 py-2  text-gray-700 bg-white border rounded-md  focus:ring-gray-300 focus:outline-none focus:ring focus:ring-opacity-30"
      ref={ref}
    />
  )
})

export default Field;

export const FieldArea = forwardRef((props: React.TextareaHTMLAttributes<HTMLTextAreaElement>, ref: any) => {

  return (
    <textarea
      {...props}
      ref={ref}
      className="block w-full px-4 py-2  text-gray-700 bg-white border rounded-md  focus:ring-gray-300 focus:outline-none focus:ring focus:ring-opacity-30"
    />
  )
})