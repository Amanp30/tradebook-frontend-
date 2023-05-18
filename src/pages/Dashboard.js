import React, { useEffect } from "react";
import Layout from "../components/Layout";
import { Heading } from "../components/Littles";

function Dashboard() {
  String.prototype.logChars = function () {
    for (let i = 0; i < this.length; i++) {
      console.log(this[i]);
    }
  };

  String.prototype.splitAndLogIndexValues = function () {
    let values = this.split("");
    values.forEach((item) => console.log(item));
  };

  String.prototype.hindislug = function (separator) {
    const regex =
      /[*+~.()'~!@#$%^&?"\-_/।!:\\/^`\+=\[\]{};:'"\\|\/,.<>?/\f/‘’/\t//\v/]/g;
    const values = this.split(" ")
      .map((item) => item.replace(regex, ""))
      .filter((item) => item !== "");
    const slug = values.join(separator || "-").toLowerCase();
    return slug;
  };

  var b = `  इंडिया, पोस्ट, {कन्फेडरेशन} ऑफ (ऑल) इंडिया [ट्रेडर्स] (CAIT) और तृप्ता टेक्नोलॉजीज ने ‘भारत ईमार्ट’ पोर्टल बनाया है, जो पूरे भारत में 'व्यापारियों' को माल की पिक-अप और डिलीवरी सेवाएं प्रदान करेगा। दिल्ली  "में" हाल ही में संचार \v राज्य मंत्री \t देवसिंह चौहान\f की उपस्थिति में "सम:झौता" ज्ञा;पन पर हस्ताक्षर किए गए। छोटे व्यापारियों, के लिए महत्व      प्रतिहार ... साम्राज्य.sdf जेम्स गुर्जर |   [प्रतिहार]-- --वंश   टॉड कहाँ "का"  {asdgkj / @! ~ * 566 = 0} 78 /*रहने वा?ला ? 9?`;
  var mk = b.hindislug("-");
  console.log(mk);

  // console.log(slugify(b));

  return (
    <>
      <Layout>
        <Heading text="Dashboard" />
      </Layout>
    </>
  );
}

export default Dashboard;
