# MOVIES

> [THE MOVIE DB](https://developers.themoviedb.org/3/getting-started/introduction) 에서 API 받아서 만들어 본 연습용 영화정보 사이트
> [사이트보기](https://seonn.netlify.com/)

## 개발환경
> create-react-app

## 사용한 라이브러리

* axios
* react-dotdotdot
* react-helmet
* react-redux
* react-scroll
* redux
* redux-actions
* styled-components

## 기타

### infinite scroll (도움받은 사이트)

- [Dnote 6 - 1. React - 무한 스크롤링 기능 구현](https://velog.io/@killi8n/Dnote-6-1.-React-%EB%AC%B4%ED%95%9C-%EC%8A%A4%ED%81%AC%EB%A1%A4%EB%A7%81-%EA%B8%B0%EB%8A%A5-%EA%B5%AC%ED%98%84.-79jmep7xes)
    - redux action 부분을 참고
    
    
- [React에서 Infinite Scroll 구현하기](https://medium.com/@ghur2002/react%EC%97%90%EC%84%9C-infinite-scroll-%EA%B5%AC%ED%98%84%ED%95%98%EA%B8%B0-128d64ea24b5)
    - Infinite Scroll 호출 참고


- [React: Build an Infinite Scroll Component from Class Components to Hooks](https://medium.com/@sligaralex/react-build-an-infinite-scroll-component-from-class-components-to-hooks-649107116add)
    - Hooks 으로 Infinite Scroll 이벤트 발생 부분 참고

- - -
 ### Issue 정리
 1. 중복
     * 페이지를 변경(컴포넌트를 벗어나도) 할때도 첫페이지에 있는 목록을 저장하기 위해 리덕스로 contents 목록을 저장함
     * 처음에 무조껀 실행되기 때문에.. 자꾸 중복콜이 발생함
     * 이전에 보고있던 페이지와 호출되야 하는 페이지를 비교해서 중복 호출되면 return
     * 추가로 호출한 배열의 마지막 id 값을 서로 비교해서 중복되면 return 처리함
     
 2. 스크롤
    * 처음 class 로 작업할 때는 브라우저의 뒤로가기 기능을 이용해도 이전에 보고 있던 곳으로 제대로 이동했으나
    * Hooks 으로 변경 이후 이유는 모르겠으나 자꾸 상단으로 붙어버림
    * 목록에서 상세로 넘어갈 때의 scrollY 의 값을 저장 후 상세에서 홈으로 돌아왔을 때만 해당위치로 이동함(scroll restoration)
    * window.scrollTo(0, y) 가 실행되지 않아서 [react-scroll](https://github.com/fisshy/react-scroll) 을 사용함
    * pc chrome 에서는 괜찮았으나.. mobile 에서 스크롤 이동이 간헐적으로 되서 setTimeout(20) 추가함
    * 2019.09.04 추가
        - 클릭할 때 scrollY 값 저장하여 뒤로가기 했을 때 해당위치로 이동 에서 클릭했던 박스의 target(name) 으로 변경함
        - offset 은 header 의 height 값, 버그(?)인지 duration 값을 변경해도 0으로 밖에 이동안함
        - setTimeout 추가 안하면 인식못하는지 이동못함
            ```
            const resId = `el-${prevPath.split("/")[2]}`;
            setTimeout(() => {
                scroller.scrollTo(resId,{duration: 0, offset: -60,});
            }, 20);
            ```

3. 페이지네이션
    * [리액트 페이지네이션 직접 구현하기](https://medium.com/@han7096/%EB%A6%AC%EC%95%A1%ED%8A%B8-%ED%8E%98%EC%9D%B4%EC%A7%80%EB%84%A4%EC%9D%B4%EC%85%98-%EA%B5%AC%ED%98%84%ED%95%98%EA%B8%B0-eb4f0f4a1da0) 참고하여 작성함

 - - -
 ### Guide 정리
 1. [Scroll Restoration](https://github.com/ReactTraining/react-router/blob/master/packages/react-router-dom/docs/guides/scroll-restoration.md)
    - 이전에 보고있던 location.pathname 을 비교해서 달라졌을 때 업데이트
    ```
    const History = ({ children, location: { pathname } }) => {
        useEffect(() => {
            window.scrollTo(0, 0);
        }, [pathname]);
        
        return children || null;
    };
    export default withRouter(History);
    ```
