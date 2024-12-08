'use server';

/**
   * form이 submit되고 나면, 정의된 action이 trigger되고, 해당 함수가 실행된다.
   * @param {*} formData : JS의 FormData
   */
export async function shareMeal(formData) {
    // 입력한 데이터 가져오기
    const meal = {
      title: formData.get('title'),
      summary: formData.get('summary'),
      instructions: formData.get('instructions'),
      image: formData.get('image'), // image picker와 맞춰야 함
      creator: formData.get('name'),
      creator_email: formData.get('email')
    }
    
    // DB저장
    console.log(meal)

  }