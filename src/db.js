let users = [
  {
    id: "asj0saa-sdass",
    name: "Lord lyton",
    age: 409,
    email: "lorad@gmail.com"
  },
  {
    id: "asj0saa-sdane",
    name: "Lord Caron",
    age: 49,
    email: "caron@gmail.com"
  },
  {
    id: "asdwplso0saa-sdass",
    name: "Khal Pono",
    age: 50,
    email: "kpono@gmail.com"
  }
];

let posts = [
  {
    id: "Sjkjs-dsnnsd",
    title: "GrapphQL",
    poster: "asj0saa-sdane",
    published: false,
    body:
      "Lorem ipsum dolor sit amet consectetur, adipisicing elit. Maiores consectetur eveniet sunt quia officiis aperiam, blanditiis quaerat repellat ex inventore aliquid beatae ipsa saepe vero vel soluta! Repudiandae, voluptas ex!"
  },
  {
    id: "-wgets-dsnnsd",
    title: "Redux Materilas",
    poster: users[1].id,
    published: true,
    body:
      "Lorem ipsum dolor sit amet consectetur, adipisicing elit. Maiores consectetur eveniet sunt quia officiis aperiam, blanditiis quaerat repellat ex inventore aliquid beatae ipsa saepe vero vel soluta! Repudiandae, voluptas ex!"
  },
  {
    id: "Sjkjs-d0923d",
    poster: users[2].id,
    title: "MetalGPX",
    published: true,
    body:
      "Lorem ipsum dolor sit amet consectetur adipisicing elit. Saepe consequuntur voluptatum fugiat nesciunt ducimus sequi itaque et optio debitis doloribus, aperiam ratione dolorum! Quasi quo incidunt dolores deleniti tempore error?"
  }
];

let comments = [
  {
    id: "jxy-234yx",
    commentor: users[1].id,
    post: posts[0].id,
    text:
      "Lorem ipsum dolor, sit amet consectetur adipisicing elit. Animi eligendi inventore debitis ex sed ratione nostrum enim ut possimus, unde excepturi minus praesentium optio exercitationem libero, cum molestiae? Ex, quia."
  },
  {
    id: "jxy-234yx",
    commentor: users[1].id,
    post: posts[2].id,
    text:
      "Lorem ipsum dolor, sit amet consectetur adipisicing elit. Explicabo sapiente culpa repellat dolore nam. Alias expedita rerum est dolores recusandae labore corporis quod, corrupti blanditiis minus sapiente saepe, a totam."
  },
  {
    id: "jxy-234yx",
    commentor: users[1].id,
    post: posts[2].id,
    text:
      "Lorem ipsum dolor, sit amet consectetur adipisicing elit. Sit obcaecati dolores esse repudiandae suscipit? Ipsum vel quo modi maxime illum, velit beatae accusantium, consectetur vero tempora sint numquam voluptatem explicabo."
  },
  {
    id: "jxy-234yx",
    post: posts[2].id,
    commentor: users[2].id,
    text:
      "Lorem ipsum dolor sit amet consectetur adipisicing elit. Nobis, ut voluptas, illo molestias nam accusamus earum voluptate neque optio similique expedita officiis modi atque ullam dolor labore totam sint? Quibusdam!"
  }
];

export const db = {
  users,
  posts,
  comments
};