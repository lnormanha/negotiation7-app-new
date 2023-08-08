import { I18n } from "i18n-js";

import en from "../translations/en.json";
import pt from "../translations/pt.json";

const translations = {
  en,
  pt,
};

const i18n = new I18n(translations);

convertDate = date => {
  let day = date.substring(8, 10);
  let month = date.substring(5, 7);
  let year = date.substring(0, 4);
  return ` ${day}/${month}/${year}`;
};

const date = convertDate(new Date().toISOString());
function getTime(locale) {
  if (locale == "en") {
    return new Date().toLocaleTimeString("en-US");
  } else {
    return new Date().toLocaleTimeString("pt-BR");
  }
}

export const mapToHtml = data => {
  console.log({ data });
  return `<html>
            <center>
	            <table width="800" height="108" border="1" cellspacing="0" cellpadding="2">
                <tbody>
                  <tr>
                    <td width="100%" height="102" valign="top" bgcolor="#efefef">
                      <p>
                        <img alt="e5aa9661a29136800642.png" style="float:left;border:0px none;outline:none;text-decoration:none;vertical-align:bottom;margin:10px 10px" width="80" height="50" border="0" src="https://res.cloudinary.com/dvwh8lar6/image/upload/v1574256659/logo_3x.png" class="CToWUd">
                        <img alt="e5aa9661a29136800642.png" style="float:right;border:0px none;outline:none;text-decoration:none;vertical-align:bottom;margin:10px 10px" width="80" height="50" border="0" src="https://res.cloudinary.com/dvwh8lar6/image/upload/v1574256659/logo_3x.png" class="CToWUd"><br>
                      </p>
                      <p align="center"><br></p>
    	                <p align="center"><span style="color:#696969"><span style="font-size:23px">${i18n.t(
                        "reportPdfTitle"
                      )}</span></span></p>
                      <p align="center"><span style="color:#696969"><span style="font-size:16px">${i18n.t(
                        "reportFilledBy"
                      )} ${data.name} ${i18n.t(
    "reportFilledIn"
  )} ${date} ${i18n.t("reportFilledAt")} ${getTime(
    data.locale
  )}</span></span></p><p></p>
                    </td>
                  </tr>
                </tbody>
              </table>
              
              <table width="800" border="1" cellspacing="0" cellpadding="2" style="margin-top:10px;">
                <tbody>
                  <tr>
                    <td width="30%" height="40%"><strong>${i18n.t(
                      "clientLabel"
                    )}</strong></td>
                    <td width="68%">${data?.report[0]?.questions[0]?.answer
                      ?.answer || i18n.t("noResponse")}</td>
                  </tr>

                  <tr>
                    <td width="30%" height="40%"><strong>${i18n.t(
                      "negotiationPlace"
                    )}</strong></td>
                    <td>${data?.report[0]?.questions[1]?.answer?.answer ||
                      i18n.t("noResponse")}</td>
                  </tr>

                  <tr>
                    <td width="30%" height="40%"><strong>${i18n.t(
                      "negotiationDate"
                    )}</strong></td>

                    <td width="68%">${data?.report[0]?.questions[2]?.answer
                      ?.answer || i18n.t("noResponse")}</td>
                  </tr>

                  <tr>
                    <td width="30%" height="40%"><strong>${i18n.t(
                      "negotiationTime"
                    )}</strong></td>

                    <td>${data?.report[0]?.questions[3]?.answer?.answer ||
                      i18n.t("noResponse")}</td>
                  </tr>

                  <tr>
                    <td width="30%" height="40%"><strong>${i18n.t(
                      "objectNegotiationLabel"
                    )}</strong></td>

                    <td>${data?.report[1]?.questions[0]?.answer?.answer ||
                      i18n.t("noResponse")}</td>
                  </tr>
                </tbody>
              </table>
              
              <table width="800" border="1" cellspacing="0" cellpadding="0" style="margin-top:10px;">
                <tbody>
                  <tr>
                    <td width="33.3%" height="30%" valign="center">
                      <div align="center">
                        <strong>${i18n.t("oursLabel")}</strong>
                      </div>
                    </td>

                    <td width="33.3%">&nbsp;</td>

                    <td width="33.3%"><div align="center"><strong>${i18n.t(
                      "theirsLabel"
                    )}</strong></div></td>
                  </tr>

                  ${mapQuestions(data.report)}
                </tbody>
              </table>

              <table width="800" border="1" cellspacing="0" cellpadding="2" style="margin-top:10px;">
                <tbody>
                  <tr>
                    <td width="100%" height="30%">
                      <div align="center">
                        <strong>${data.report[5].name}</strong>
                      </div>
                    </td>
                  </tr>
                </tbody>
              </table>
              
              ${(data.report[5].coins && mapTradeCoins(data.report[5].coins)) ||
                ""}
                                
              <table width="800" border="1" cellspacing="0" cellpadding="2" style="margin-top:10px;">
                <tbody>
                  <tr>
                    <td width="100%" height="30%">
                      <div align="center">
                        <strong>${data.report[6].name}</strong>
                      </div>
                    </td>
                  </tr>
                </tbody>
              </table>

              <table width="800" border="1" cellspacing="0" cellpadding="2">
                <tbody>
                  <tr>
                    <td width="50%">
                      <div align="center"><strong>${i18n.t(
                        "oursLabel"
                      )}</strong></div>
                    </td>
                    
                    <td width="50%">
                      <div align="center">
                        <strong>${i18n.t("theirsLabel")}</strong>
                      </div></td>
                  </tr>

                  <tr>
                    ${mapArguments(data.report[6])}
                  </tr>
                </tbody>
              </table>

              <table width="800" height="88" border="1" cellspacing="0" cellpadding="2" style="margin-top:10px;">
                <tbody>
                  <tr>
                    <td width="25%" height="82" valign="top">
                      <p><strong>${data.report[7].name}</strong></p>

                      <p>${data?.report[7]?.questions[0]?.answer?.answer ||
                        i18n.t("noResponse")}</p>
                    </td>
                  </tr>
                </tbody>
              </table>
              <table width="800" height="10" border="1" cellspacing="0" cellpadding="2">
                <tbody>

                  <tr>
                    <td width="25%" height="10" valign="bottom" bgcolor="#20394D"><font color="#fff">${i18n.t(
                      "formFilledVia"
                    )}</font></td>
                  </tr>
                </tbody>
              </table>
            </>
          </html>`;
};

function mapQuestions(report) {
  return report
    .map((question, index) => {
      if (index > 1 && index < 5) {
        return `<tr>
                <td width="33%"><p>${question?.questions[0]?.answer?.answer ||
                  "Sem resposta"}</p></td>
                      <td><div align="center">
                          <p><strong>${question.name}</strong></p>
                      </div></td>
                  <td width="28%"><p>${question?.questions[1]?.answer?.answer ||
                    i18n.t("noResponse")}</p>
              </td>
          </tr>`;
      }
    })
    .join("");
}

function mapTradeCoins(coins) {
  return coins
    .map((coin, index) => {
      return `<table width="800" border="1" cellspacing="0" cellpadding="2" style="table-layout: fixed;>
      <tbody>
            <tr>
              <td width="100%"  border="1">
                  <div align="center">
                      <strong>${coin.name}</strong>
                  </div>
              </td>
            </tr>
            <tr>
              <td width="20%">
                  <div align="center">
                      <strong>${i18n.t("initialOffer")}</strong>
                  </div>
              </td>
              <td width="20%">
                  <div align="center">
                      <strong>${i18n.t("desiredValue")}</strong>
                  </div>
              </td>
              <td width="20%">
                  <div align="center">
                      <strong>${i18n.t("departurePoint")}</strong>
                  </div>
              </td>
              <td width="20%">
                  <div align="center">
                      <strong>${i18n.t("desiredValueTheirs")}</strong>
                  </div>
              </td>
          </tr>

          <tr>
              <td width="20%" max-width="20%" style="word-wrap:break-word"><p>${
                coin.initial_offer.answer
              }</p></td>
              <td width="20%" max-width="20%" style="word-wrap:break-word"><p>${
                coin.desired_value.answer
              }</p></td>
              <td width="20%" max-width="20%" style="word-wrap:break-word"><p>${
                coin.departure_point.answer
              }</p></td>
              <td width="20%" max-width="20%" style="word-wrap:break-word"><p>${
                coin.desired_value_of_them.answer
              }</p></td>
          </tr>
         
      </tbody>
  </table>`;
    })
    .join("");
}

function mapArguments(argument) {
  return argument.questions
    .map(question => {
      return `<td width="40%">${question?.answer?.answer ||
        i18n.t("noResponse")}</td>`;
    })
    .join("");
}
