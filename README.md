# Mongo-II
nomard Youtube Code Challenge 8

```
(1)/는 DB에 있는 모든 영화의 제목이 나열된 GET 라우트입니다.
    / 라우트와 연결된 home 컨트롤러는 DB에 있는 모든 영화를 찾아와 pageTitle과 함께 DB를 movies.pug로 보내야 합니다.
    const movies = await Movie.find({})
    Model.find()를 사용하여 Movie의 DB를 가져오면 됩니다.
    몽구스의 Model 메서드를 사용하면 시간이 소요되기 때문에 동기화 처리가 필요합니다. async/await을 사용하여 동기화처리를 해주면 됩니다.

(2)/upload는 영화를 생성하는 Form 페이지를 렌더하는 GET 라우트와, 사용자가 form에서 생성한 영화정보를 DB로 보내는 POST 라우트입니다.

(2-1) /upload 라우트와 연결된 create 컨트롤러는 req.method가 GET인 경우, create.pug를 렌더하면 됩니다.

(2-2) req.method가 POST인 경우, 사용자가 form에서 입력한 정보를 req.body를 통해 받아 DB에 새로운 Movie를 추가하고 새로 추가된 Movie의 id값으로 redirect 하면 됩니다.
    const newMovie = await Movie.create({ title, summary, … , genres: genres.split(",") })
    Model.create()를 사용해 req.body를 통해 받은 정보를 입력하여 DB에 새로운 Movie를 추가하면 됩니다.
    res.redirect(`/${newMovie.id}`)라고 작성하여 Movie를 새롭게 만들면 그 Movie의 상세 페이지로 redirect되게 합니다.

(3) /movies/:id는 각 영화의 상세 정보를 볼 수 있는 GET 라우트입니다.
    이 라우트와 연결된 detail 컨트롤러는 DB에서 사용자가 원하는 각 영화를 찾아와야 합니다.
    먼저 req.params으로 영화의 id 값을 가져옵니다.
    const movie = await Movie.findById(id)
    Movie.findById() 메서드를 사용하면 Movie의 id값으로 해당하는 Movie를 찾아 올 수 있습니다.
    찾아온 Movie를 pageTitle과 함께 detail.pug로 보내 렌더하면 됩니다.

(4) /movies/:id/edit는 영화의 정보를 편집하는 Form 페이지를 볼 수 있는 GET 라우트와, DB에 편집된 영화를 저장하는 POST 라우트입니다.

(4-1) 이 라우트와 연결된 edit 컨트롤러는 req.method가 GET인 경우, 편집할 영화를 찾아 edit.pug를 렌더 해야 합니다.
    req.params으로 Movie의 id 값을 가져와 Model.findById() 메서드에 id 값을 입력하면 편집할 Movie를 찾아 올 수 있습니다. 찾아온 그 Movie를 edit.pug에 렌더하면 됩니다.

(4-2) req.method가 POST인 경우, 사용자가 form에서 입력한 정보를 req.body를 통해 받아 DB에 업데이트하고 업데이트한 Movie의 id값으로 redirect 해야 합니다.
    Model.findByIdAndUpdate(id, 업데이트할 데이터)를 사용하여 id로 Movie를 찾고 업데이트합니다.
    res.redirect(`/${id}`): 업데이트한 Movie의 상세 페이지로 이동합니다.

(5)/movies/:id/delete는 영화를 삭제하는 GET 라우트입니다.
    이 라우트와 연결된 remove 컨트롤러는 req.params으로 삭제할 영화의 id를 가져와야 합니다.
    Model.findByIdAndDelete(id) 메서드를 사용하면 Movie의 id 값으로 Movie를 삭제할 수 있습니다.
    삭제 후 /로 redirect 해주면 됩니다.

(6)/search는 제목별로 영화를 검색하는 GET 라우트입니다.
    이 라우트와 연결된 search컨트롤러는 제목별로 영화를 검색할 수 있게 해야 합니다.
    req.query로 사용자가 form에 입력한 title을 가져와 Model.find(title) 메서드에 입력하면 해당하는 영화를 찾을 수 있습니다.
    req.query로 사용자가 form에 입력하는 값을 가져오기 위해서는 form의 method를 GET으로 지정하고, input의 name을 반드시 지정해 주어야 합니다.
    title: { $regex: new RegExp(`${title}$`, "i") }
    사용자가 입력한 title과 일치하는 title을 찾는 정규식을 작성하려면 위의 코드처럼 작성하면 됩니다.
    검색된 영화 목록을 pageTitle과 함께 search.pug로 렌더합니다.
```
