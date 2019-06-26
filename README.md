#ORDER-BOOK

Kept it very simple.

Techs:
 Redux Saga(Event Channel)
 Redux
 React
 Websockets
 React-Scripts (For Scaffolding It). we can use webpack externally for production rated apps.
 Docker
 Heroku



 Simply select instrument value from dropdown , then load orders. Once you selected instrument load order button wil get disabled. To enable it reselect new intsrument again.

 Kept it in a way like it does not make any new websocket connection for new instrument & also if user select same instrument again it does not send any call to backend since it is already selected.

 Once it select new instrument , it un subscriibe first one then subscribe new one.










