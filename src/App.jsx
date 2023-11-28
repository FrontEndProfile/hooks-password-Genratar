import { useState, useCallback, useEffect , useRef } from 'react'

import './App.css'

function App() {
  const [length, setLength] = useState(8)
  const [numberAllowed, setNumberAllowed] = useState(false)
  const [charAllowed, setCharAllowed] = useState(false)
  const [password, setPassword] = useState("")
  const passwordRef = useRef(null)

  const passwordGenerator = useCallback(
    () => {
      let pass = ""
      let str = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopgrstuvwxyz"

      if (numberAllowed) str += "0123456789"
      if (charAllowed) str += "1@#$%&k—_+=[]{}~"

      for (let i = 0; i <= length; i++) {
        let char = Math.floor(Math.random() * str.length + 1)
        pass += str.charAt(char)
      }

      setPassword(pass)

    }, [length, numberAllowed, charAllowed, setPassword],
  )
  const copyPasswordClipBoard = useCallback(()=>{
    passwordRef.current?.select()
    window.navigator.clipboard.writeText(password)
  }, [password])

  useEffect(() => {
    passwordGenerator()
  }, [length, numberAllowed, charAllowed, passwordGenerator])



  return (
    <div className='bg-gray-900 h-screen flex items-center justify-center'>
      <div className="bg-gray-600 rounded-2xl shadow-lg text-gray-200 font-medium py-20 px-16">
        <h1 className='font-sans text-4xl tracking-wide mb-7'>Password Genrator</h1>
        <div className='py-3'>
          <div className='flex items-center mb-3'>
            <input
              type="text"
              className='bg-gray-700 w-full py-2 text-xl outline-none px-3 rounded-l-lg'
              value={password}
              readOnly
              ref={passwordRef}
            />
            <button 
            
            className='px-5 py-2 text-xl bg-gray-500 rounded-r-lg'
            onClick={copyPasswordClipBoard}
            >Copy</button>
          </div>
          <div className='flex items-center gap-4 flex-wrap'>
            <div className='flex justify-between  w-full'>
              <input className='text-xl w-9/12'
                type="range"
                min={6}
                max={100}
                value={length}
                onChange={(e) => { setLength(e.target.value) }}
              />
              <div className="length w-3/12 ml-3">Length ( {length} )</div>
            </div>
            <div className='w-1/2'>
              <input type="checkbox" name="NumberInput" id="num" className='text-2xl w-5 h-5 border-gray-400 mr-3'
                defaultChecked={numberAllowed}
                onChange={() => {
                  setNumberAllowed((prev) => !prev)
                }} />
              <label htmlFor="num" className='text-2xl'>Number</label>
            </div>
            <div className='w-1/2'>
              <input type="checkbox" name="CharacterInput" id="char" className='text-2xl w-5 h-5 border-gray-400 mr-3'
                defaultChecked={charAllowed}
                onChange={() => {
                  setCharAllowed((prev) => !prev)
                }} />
              <label htmlFor="char" className='text-2xl'>Character</label>
            </div>
          </div>


        </div>
      </div>
    </div>
  )
}

export default App
