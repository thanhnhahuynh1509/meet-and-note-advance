/* eslint-disable react-hooks/exhaustive-deps */
import { useEffect, useState } from "react";
import Header from "../ui/main-page/Header";
import Toolbar from "../ui/main-page/Toolbar";
import Workspace from "../ui/main-page/Workspace";
import { useNavigate, useParams } from "react-router-dom";
import { getMe } from "../apis/user-api";
import { useDispatch, useSelector } from "react-redux";
import {
  loadComponents,
  setMe,
  setParent,
  setRoom,
  userState,
} from "../common/store";
import {
  join,
  subscribeCreateChat,
  subscribeCreateComponent,
  subscribeDeleteChat,
  subscribeDeleteComponent,
  subscribeUpdateComponent,
} from "../socket/socket";
import { getComponentById, getComponentsByParent } from "../apis/component-api";

function MainPage() {
  const [isLoading, setIsLoading] = useState(true);
  const params = useParams();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const me = useSelector(userState);

  useEffect(() => {
    const loadUser = async () => {
      try {
        setIsLoading(true);
        const me = await getMe();
        dispatch(setMe(me));
        return navigate(`/${params.id || me.home}`);
      } catch (e) {
        console.log(e);
        return navigate("/sign-in");
      } finally {
        setIsLoading(false);
      }
    };
    loadUser();
  }, []);

  useEffect(() => {
    async function init() {
      if (params.id && me) {
        join({ room: params.id, user: me });
        dispatch(setRoom(params.id));
        dispatch(setParent(await getComponentById(params.id)));
        dispatch(loadComponents(await getComponentsByParent(params.id)));
        subscribeCreateComponent(dispatch);
        subscribeUpdateComponent(dispatch);
        subscribeDeleteComponent(dispatch);
        subscribeCreateChat(dispatch);
        subscribeDeleteChat(dispatch);
      }
    }

    init();
  }, [params.id, me]);

  return (
    <div style={{ overflow: "hidden", position: "relative" }}>
      {!isLoading && (
        <>
          <Header />
          <div style={{ display: "flex" }}>
            <Toolbar />
            <Workspace />
          </div>
        </>
      )}
    </div>
  );
}

export default MainPage;
