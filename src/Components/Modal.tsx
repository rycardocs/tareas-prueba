import { useEffect } from "react";

type Props = {
  state: boolean;
  cState: (e: boolean) => void;
  children: React.ReactNode
}

const Modal = ({ cState, state, children }: Props) => {

  useEffect(() => {
    if (state) {
     document.body.style.overflow = "hidden";
   
    } else {
     document.body.style.overflow = "auto"

    }
  }, [state]);
  return (
    <>
    {state && (

        <div className={`absolute top-0 left-0 w-screen h-screen bg-stone-500/50 z-50`}>
          <div className="text-end py-8 px-16 text-white text-2xl cursor-pointer" onClick={()=> cState(false)}>X</div>
          <div className={`fixed z-50 left-1/2 lg:top-1/2 lg:-translate-y-1/2 transform -translate-x-1/2 transition-all ease-in-out` }>
            {children}
          </div>
        </div>
    
    )}
  </>
  )
}

export default Modal