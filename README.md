# MOVIES

[THE MOVIE DB](https://developers.themoviedb.org/3/getting-started/introduction) 에서 API 받아서 만들어 본 연습용 영화정보 사이트

- now playing 정보에서 값을 받아오다가 무슨 오류인지 중복값이 섞여 들어와서 콘솔오류 보기싫어서 popular 로 바꿨다.
- 바꾼 이후에는 오류 없이 깔끔하게 잘나옴
- HomeContainer 가 hooks 으로 잘 안되서 class 형으로 만들고 나중에 다시 변경했다.


## infinite scroll (도움받은 사이트)

- [Dnote 6 - 1. React - 무한 스크롤링 기능 구현](https://velog.io/@killi8n/Dnote-6-1.-React-%EB%AC%B4%ED%95%9C-%EC%8A%A4%ED%81%AC%EB%A1%A4%EB%A7%81-%EA%B8%B0%EB%8A%A5-%EA%B5%AC%ED%98%84.-79jmep7xes)
    - redux action 부분을 참고했다. 중복 실행에 큰 도움이 ㅜㅜ
    
    
- [React에서 Infinite Scroll 구현하기](https://medium.com/@ghur2002/react%EC%97%90%EC%84%9C-infinite-scroll-%EA%B5%AC%ED%98%84%ED%95%98%EA%B8%B0-128d64ea24b5)
    - Scroll 함수 부분에서 큰 도움이!! jQuery 는 간단했는데.... (주륵)
    
    
- [React: Build an Infinite Scroll Component from Class Components to Hooks](https://medium.com/@sligaralex/react-build-an-infinite-scroll-component-from-class-components-to-hooks-649107116add)
    - Hooks 로 변경했을 때 매우매우 큰 도움이...!
    - 기존 클래스형에서 비슷하게 작성했는데 전혀 실행이 안됬는데, 여기 글을 보고 useEffect dependency 로 해결했다.
    
 
 ### HomeContainer
 - 처음에 class 로 만들었고, 다른페이지를 다 hooks 으로 만든 뒤 수정했다.
 - 기존파일은 HomeContainer_class.js 에서 확인~