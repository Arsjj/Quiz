import React from "react";
import { useGlobalContext } from "./context";
import { Button, Input, Select, SelectItem } from "@nextui-org/react";
import { Image } from "@nextui-org/react";

const categories = [
  {
    key: "generalKnowledge",
    title: "General knowledge",
  },
  {
    key: "history",
    title: "History",
  },
  {
    key: "geography",
    title: "Geography",
  },
  {
    key: "sports",
    title: "Sports",
  },
  {
    key: "films",
    title: "Films",
  },
  {
    key: "music",
    title: "Music",
  },
  {
    key: "vehicles",
    title: "Vehicles",
  },
  {
    key: "books",
    title: "Books",
  },
  {
    key: "politics",
    title: "Politics",
  },
];

const SetupForm = () => {
  const { quiz, setQuiz, handleSubmit, error } = useGlobalContext();
  return (
    <main>
      <section className="quiz quiz-small relative rounded-2xl max-sm:w-full max-sm:px-5">
        <div className="absolute top-0 right-0 w-28 h-28">
          <img src="https://png.pngtree.com/png-vector/20230503/ourmid/pngtree-quiz-time-bubble-speech-banner-vector-design-png-image_7078139.png"></img>
        </div>

        <form className="setup-form">
          <h2 className="py-5 font-bold">Setup quiz</h2>
          {/* amount */}
          <div className="form-control">
            <Input
              labelPlacement="outside"
              label="Number Of Questions"
              size="md"
              name="amount"
              type="number"
              defaultValue={quiz.amount}
              onChange={(e) => setQuiz({ ...quiz, amount: e.target.value })}
              min={1}
              max={50}
            />
          </div>
          {/* category */}

          <div className="form-control">
            <Select
              label="Category"
              labelPlacement="outside"
              // className="max-w-md"
              placeholder=" "
              defaultSelectedKeys={[quiz.category]}
              onChange={(e) => setQuiz({ ...quiz, category: e.target.value })}
              classNames={{ listbox: "p-0" }}
            >
              {categories.map((category) => (
                <SelectItem
                  className="data-[selectable=true]:focus:bg-blue-400 data-[hover=true]:bg-blue-400"
                  key={category.key}
                >
                  {category.title}
                </SelectItem>
              ))}
            </Select>
          </div>
          <div className="form-control">
            <Select
              label="Difficulty"
              labelPlacement="outside"
              placeholder=" "
              // className="max-w-md"
              defaultSelectedKeys={[quiz.difficulty]}
              onChange={(e) => {
                setQuiz({ ...quiz, category: e.target.value });
              }}
            >
              <SelectItem key="easy">Easy</SelectItem>
              <SelectItem key="medium">Medium</SelectItem>
              <SelectItem key="hard">Hard</SelectItem>
            </Select>
          </div>

          {error && (
            <p className="error">
              Can't generate questions, please try different options
            </p>
          )}
          <Button
            type="submit"
            onClick={handleSubmit}
            className="w-full bg-amber-500/90 font-semibold text-base"
          >
            Start
          </Button>
        </form>
      </section>
    </main>
  );
};

export default SetupForm;
