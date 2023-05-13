import React, { useState } from "react";
import Layout from "../components/Layout";
import Texteditor from "../components/Texteditor";
import { newStrategy } from "../services/apiEndpoints";

function Strategy() {
  const [value, setValue] = useState(
    `"<p>import React, { Component } from 'react'&nbsp;</p><p>import ReactQuill from 'react-quill'&nbsp;</p><p>import 'react-quill/dist/quill.snow.css'&nbsp;</p><p>import ReactHtmlParser from 'react-html-parser'</p><p>import './App.css'</p><p><br></p><p>export default class App extends Component {&nbsp;</p><p>&nbsp;state = { text: ''}</p><p>&nbsp;handleChange = (value)&nbsp;=&gt; {</p><p>&nbsp;&nbsp;this.setState({ text: value })</p><p>&nbsp;&nbsp;&nbsp;</p><p>&nbsp;}&nbsp;</p><p>&nbsp;render() {</p><p>&nbsp;&nbsp;return (</p><p>&nbsp;&nbsp;&nbsp;&lt;div className='container'&gt;</p><p>&nbsp;&nbsp;&nbsp;&nbsp;&lt;ReactQuill&nbsp;</p><p>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;value={this.state.text}&nbsp;</p><p>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;onChange={this.handleChange}&nbsp;&nbsp;</p><p>&nbsp;&nbsp;&nbsp;&nbsp;/&gt;</p><p>&nbsp;&nbsp;&nbsp;&nbsp;&lt;div class='text'&gt;</p><p>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;{ ReactHtmlParser(this.state.text)&nbsp;&nbsp;}</p><p>&nbsp;&nbsp;&nbsp;&nbsp;&lt;/div&gt;</p><p>&nbsp;&nbsp;&nbsp;&lt;/div&gt;&nbsp;&nbsp;</p><p>&nbsp;&nbsp;)</p><p>&nbsp;}</p><p>}</p>"`
  );

  function saveStrategy() {
    const formData = new FormData();
    formData.append("strategy", value);

    newStrategy(formData)
      .then((res) => {
        console.log(res);
        // Handle the response from the server here
      })
      .catch((error) => {
        console.log(error);
        // Handle any errors here
      });
  }

  return (
    <>
      <Layout>
        <Texteditor value={value} setValue={setValue} />

        <br />
        <br />
        <br />
        <br />
        <br />
        <br />
        <br />
        <button onClick={saveStrategy}>Save</button>
      </Layout>
    </>
  );
}

export default Strategy;
