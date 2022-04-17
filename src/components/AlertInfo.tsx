import React from 'react'

type Props = {
    title: string,
    message: string,
}

const AlertInfo = (props: Props) => {
    const [open, setOpen] = React.useState(true)
  return (
    open ? (<div className="flex max-w-fit px-4 py-2.5 mb-4 text-sm text-gray-200 bg-gray-700 rounded-lg" role="alert">
  <svg className="inline flex-shrink-0 mr-3 w-5 h-5" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z" clipRule="evenodd"></path></svg>
  <div>
    <span className="font-medium">{props.title}</span> {props.message}
  </div>
    <button onClick={() => setOpen(false)} className="ml-2 text-sm text-gray-400 focus:outline-none">
    <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
  <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
</svg>    </button>
</div> ): (<span></span>)
    );
}

export default AlertInfo