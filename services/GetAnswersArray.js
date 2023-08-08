export function mapAnswersArray(negotiations, questions) {
  const { report, current_topic } = negotiations;
  let answer = "";
  let answers = questions.map((question, index) => {
    if (current_topic.id != 6) {
      if (current_topic.qtd_answer > 0) {
        report.forEach(topic => {
          if (topic.id == current_topic.id) {
            topic.questions.forEach(questionTopic => {
              if (questionTopic.id == question.id) {
                answer = questionTopic?.answer?.answer;
                return;
              }
            });
          }
        });
      }
    }
    return {
      answer: answer,
      id_question: question.id
    };
  });

  return { answers, editAnswer: current_topic.qtd_answer > 0 ? true : false };
}
