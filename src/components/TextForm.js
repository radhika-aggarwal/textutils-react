import React, {useState}from 'react'

export default function TextForm(props) {
  let [text, setText]= useState('');
  const touppercase= ()=>{
    setText(text.toUpperCase());
    props.showalert("Converted to UpperCase!", "success");
  }

  const tolowercase= ()=>{
    setText(text.toLowerCase())
    props.showalert("Converted to LowerCase!", "success");
  }
  const clearText= ()=>{
    setText('')
    props.showalert("Text has been cleared!", "success");
  }

  const copy= ()=>{
    navigator.clipboard.writeText(text)
    .then(() => alert("Copied to clipboard!"),
    props.showalert("Text has been copied", "sucess"))
    .catch(err => console.error("Error copying text", err),
    props.showalert("Error!", "danger"));
  }
  const handleOnChange= (event)=>{
    setText(event.target.value)
  }

  const speak = () => {
    let msg = new SpeechSynthesisUtterance();
    msg.text = text;
    window.speechSynthesis.speak(msg);
  }

  const lengthofchar= (word)=> {
    let x=0;
    for(let i=0;i<word.length;i++){
      if(word[i]!==' ') x++;
    }
    return x;
  }


  return (
    <>
      <div className={`container text-${props.mode==='dark'? 'white':'black'}`}>
        <h1 className='mb-2'> {props.heading}</h1>
        <div className="mb-3">
          <textarea className="form-control " value={text} id="myBox" rows="8" onChange={handleOnChange} style={{backgroundColor: props.mode==='dark'? '#13466e':'white', color:props.mode==='dark'? 'white':'black'}}></textarea>
          <button className={`btn btn-${props.color} mx-2 my-2`} onClick={touppercase} disabled={text.length===0}>Convert to UpperCase</button>
          <button className={`btn btn-${props.color} mx-2 my-2`} onClick={tolowercase} disabled={text.length===0}>Convert to LowerCase</button>
          <button className={`btn btn-${props.color} mx-2 my-2`} onClick={clearText} disabled={text.length===0} >Clear Text</button>
          <button className={`btn btn-${props.color} mx-2 my-2`} onClick={copy} disabled={text.length===0}>Copy To Clipboard</button>
          <button type="submit" onClick={speak} className="btn btn-warning mx-2 my-2 " disabled={text.length===0}>Speak</button>
        </div>
      </div>
      <div className={`my-3 container text-${props.mode==='dark'? 'white':'black'}`}>
        <h2> Text Summary</h2>
        <p> {text.split(/\s+/).filter((element)=>{return element.length!==0}).length} words and {lengthofchar(text)} characters.</p>
        <p> Time taken to read {text.split(/\s+/).filter((element)=>{return element.length!==0}).length* 0.008} minutes</p>
        <h2> Preview: </h2>
        <p> {text.length>0? text:"Nothing to Preview."}</p>
      </div>
    </>
  )
}