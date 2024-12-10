"use server";

import { redirect } from "next/navigation";
import { saveMeal } from "./meals";
import { revalidatePath } from "next/cache";

function isInvalidText(text) {
  return !text || text.trim() === "";
}

/**
 * form이 submit되고 나면, 정의된 action이 trigger되고, 해당 함수가 실행된다.
 * @param {*} formData : JS의 FormData
 */
export async function shareMeal(prevState, formData) {
  // 입력한 데이터 가져오기
  const meal = {
    title: formData.get("title"),
    summary: formData.get("summary"),
    instructions: formData.get("instructions"),
    image: formData.get("image"), // image picker와 맞춰야 함
    creator: formData.get("name"),
    creator_email: formData.get("email"),
  };

  // validate input: input tag에 required가 있지만, 개발자도구에서 해당 prop을 삭제하면 validation이 안됨
  if (
    isInvalidText(meal.title) ||
    isInvalidText(meal.summary) ||
    isInvalidText(meal.instructions) ||
    isInvalidText(meal.creator) ||
    isInvalidText(meal.creator_email) ||
    !meal.creator_email.includes("@") ||
    !meal.image ||
    !meal.image.size === 0
  ) {
    return {
      message: "Invalid input",
    };
  }

  // DB저장
  await saveMeal(meal);
  // nextjs에게 특정 Route path에 속한 페이지를 revalidate를 하게 요청함
  // 두번째 parameter type에 따라 nested path는 재검사 여부가 달라짐
  revalidatePath("/meals");

  redirect("/meals");
}
