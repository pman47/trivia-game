import { useEffect, useState } from "react";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import "./App.css";

let url = "https://jservice.io/api/random";

function App() {
  const [question, setQuestion] = useState(null);
  const [score, setScore] = useState(0);
  const [ans, setAns] = useState("");

  const loadQuestion = () => {
    fetch(url)
      .then((jsonData) => jsonData.json())
      .then((data) => {
        setQuestion(data[0]);
      });
  };

  useEffect(() => {
    loadQuestion();
  }, []);

  const right = () =>
    toast.success("Correct !", {
      position: "top-center",
      autoClose: 1500,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: false,
      draggable: true,
      progress: undefined,
    });

  const wrong = () =>
    toast.error("Wrong Answer :(", {
      position: "top-center",
      autoClose: 1500,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: false,
      draggable: true,
      progress: undefined,
    });

  const handleSubmit = (event) => {
    event.preventDefault();
    let questionAns = question.answer.trim();
    questionAns = questionAns.replace(/<[^>]*>?/gm, ""); // removing tags from question answer like <i></i>
    if (
      questionAns == ans ||
      questionAns.toLowerCase() == ans.toLowerCase().trim()
    ) {
      setAns("");
      setScore(Number(score) + Number(question.value));
      right();
      loadQuestion();
    } else {
      wrong();
      setAns("");
      loadQuestion();
    }
  };

  // console.log(question);

  return (
    <div className="App">
      <div className="container">
        {question === null ? (
          <div id="loading">Loading...</div>
        ) : (
          <>
            <div id="category_score">
              <span id="category">Category : {question.category.title}</span>
              <span id="score">Your Score : {score}</span>
            </div>
            <div id="question_answer">
              <div id="question">{question.question}</div>
              <div id="question_score">
                Score : {question.value == null ? 0 : question.value}
              </div>
              <form onSubmit={(event) => handleSubmit(event)}>
                <label id="ans_container">
                  Answer :{" "}
                  <input
                    type="text"
                    id="ans"
                    value={ans}
                    onChange={(e) => {
                      setAns(e.target.value);
                    }}
                    required
                  />
                </label>
                <button type="submit" id="submitBtn">
                  Submit
                </button>
              </form>
            </div>
          </>
        )}
      </div>
      <ToastContainer />
    </div>
  );
}

export default App;
