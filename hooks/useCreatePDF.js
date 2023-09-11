import { useLocalization } from "@/context/LocalizationProvider";

export function useCreatePDF() {
  const { getCurrentLocale, getLocaleString } = useLocalization();

  const convertDate = (date) => {
    let day = date.substring(8, 10);
    let month = date.substring(5, 7);
    let year = date.substring(0, 4);
    return ` ${day}/${month}/${year}`;
  };

  function getTime(locale) {
    if (locale == "en") {
      return new Date().toLocaleTimeString("en-US");
    } else {
      return new Date().toLocaleTimeString("pt-BR");
    }
  }

  const date = convertDate(new Date().toISOString());

  const mapToHtml = (data) => {
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
                        <p align="center"><span style="color:#696969"><span style="font-size:23px">${getLocaleString(
                          "reportPdfTitle"
                        )}</span></span></p>
                        <p align="center"><span style="color:#696969"><span style="font-size:16px">${getLocaleString(
                          "reportFilledBy"
                        )} ${data.name} ${getLocaleString(
      "reportFilledIn"
    )} ${date} ${getLocaleString("reportFilledAt")} ${getTime(
      data.locale
    )}</span></span></p><p></p>
                      </td>
                    </tr>
                  </tbody>
                </table>
                
                <table width="800" border="1" cellspacing="0" cellpadding="2" style="margin-top:10px;">
                  <tbody>
                    <tr>
                      <td width="30%" height="40%"><strong>${getLocaleString(
                        "clientLabel"
                      )}</strong></td>
                      <td width="68%">${
                        data?.report[0]?.questions[0]?.answer?.answer ||
                        getLocaleString("noResponse")
                      }</td>
                    </tr>
  
                    <tr>
                      <td width="30%" height="40%"><strong>${getLocaleString(
                        "negotiationPlace"
                      )}</strong></td>
                      <td>${
                        data?.report[0]?.questions[1]?.answer?.answer ||
                        getLocaleString("noResponse")
                      }</td>
                    </tr>
  
                    <tr>
                      <td width="30%" height="40%"><strong>${getLocaleString(
                        "negotiationDate"
                      )}</strong></td>
  
                      <td width="68%">${
                        data?.report[0]?.questions[2]?.answer?.answer ||
                        getLocaleString("noResponse")
                      }</td>
                    </tr>
  
                    <tr>
                      <td width="30%" height="40%"><strong>${getLocaleString(
                        "negotiationTime"
                      )}</strong></td>
  
                      <td>${
                        data?.report[0]?.questions[3]?.answer?.answer ||
                        getLocaleString("noResponse")
                      }</td>
                    </tr>
  
                    <tr>
                      <td width="30%" height="40%"><strong>${getLocaleString(
                        "objectNegotiationLabel"
                      )}</strong></td>
  
                      <td>${
                        data?.report[1]?.questions[0]?.answer?.answer ||
                        getLocaleString("noResponse")
                      }</td>
                    </tr>
                  </tbody>
                </table>
                
                <table width="800" border="1" cellspacing="0" cellpadding="0" style="margin-top:10px;">
                  <tbody>
                    <tr>
                      <td width="33.3%" height="30%" valign="center">
                        <div align="center">
                          <strong>${getLocaleString("oursLabel")}</strong>
                        </div>
                      </td>
  
                      <td width="33.3%">&nbsp;</td>
  
                      <td width="33.3%"><div align="center"><strong>${getLocaleString(
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
                
                ${
                  (data.report[5].coins &&
                    mapTradeCoins(data.report[5].coins)) ||
                  ""
                }
                                  
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
                        <div align="center"><strong>${getLocaleString(
                          "oursLabel"
                        )}</strong></div>
                      </td>
                      
                      <td width="50%">
                        <div align="center">
                          <strong>${getLocaleString("theirsLabel")}</strong>
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
  
                        <p>${
                          data?.report[7]?.questions[0]?.answer?.answer ||
                          getLocaleString("noResponse")
                        }</p>
                      </td>
                    </tr>
                  </tbody>
                </table>
                <table width="800" height="10" border="1" cellspacing="0" cellpadding="2">
                  <tbody>
  
                    <tr>
                      <td width="25%" height="10" valign="bottom" bgcolor="#20394D"><font color="#fff">${getLocaleString(
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
                  <td width="33%"><p>${
                    question?.questions[0]?.answer?.answer || "Sem resposta"
                  }</p></td>
                        <td><div align="center">
                            <p><strong>${question.name}</strong></p>
                        </div></td>
                    <td width="28%"><p>${
                      question?.questions[1]?.answer?.answer ||
                      getLocaleString("noResponse")
                    }</p>
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
                        <strong>${getLocaleString("initialOffer")}</strong>
                    </div>
                </td>
                <td width="20%">
                    <div align="center">
                        <strong>${getLocaleString("desiredValue")}</strong>
                    </div>
                </td>
                <td width="20%">
                    <div align="center">
                        <strong>${getLocaleString("departurePoint")}</strong>
                    </div>
                </td>
                <td width="20%">
                    <div align="center">
                        <strong>${getLocaleString(
                          "desiredValueTheirs"
                        )}</strong>
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
      .map((question) => {
        return `<td width="40%">${
          question?.answer?.answer || getLocaleString("noResponse")
        }</td>`;
      })
      .join("");
  }

  return { mapToHtml };
}
