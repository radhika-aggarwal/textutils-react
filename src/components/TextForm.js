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

  return (
    <>
      <div className={`container text-${props.mode==='dark'? 'white':'black'}`}>
        <h1 > {props.heading}</h1>
        <div className="mb-3">
          <textarea className="form-control " value={text} id="myBox" rows="8" onChange={handleOnChange} style={{backgroundColor: props.mode==='dark'? 'gray':'white', color:props.mode==='dark'? 'white':'black'}}></textarea>
          <button className={`btn btn-${props.color} mx-2`} onClick={touppercase}>Convert to UpperCase</button>
          <button className={`btn btn-${props.color} mx-2`} onClick={tolowercase}>Convert to LowerCase</button>
          <button className={`btn btn-${props.color} mx-2`} onClick={clearText}>Clear Text</button>
          <button className={`btn btn-${props.color} mx-2`} onClick={copy}>Copy To Clipboard</button>
          <button type="submit" onClick={speak} className="btn btn-warning mx-2 my-2">Speak</button>
        </div>
      </div>
      <div className={`my-3 container text-${props.mode==='dark'? 'white':'black'}`}>
        <h2> Text Summary</h2>
        <p> {text.split(' ').length} words and {text.length} characters.</p>
        <p> Time taken to read {text.split(' ').length* 0.008} minutes</p>
        <h2> Preview: </h2>
        <p> {text.length>0? text:"Enter your text to preview"}</p>
      </div>
    </>
  )
}
