import { useWorld } from "@entities/world/model/useWorld";
import { ICE } from "@shared/config/constants";

const rand = (a: number, b: number) => a + Math.random() * (b - a);

/** 빙판 on/off  */
export function updateIce(now: number) {
  const w = useWorld.getState();

  if (w.surface === "ice" && now >= w.iceUntil) {
    useWorld.setState({ surface: "normal" });
  }

  // 다음 빙판 시작
  if (now >= w.nextIceAt && w.surface !== "ice") {
    const dur = rand(ICE.DURATION_MIN, ICE.DURATION_MAX);
    useWorld.setState({
      surface: "ice",
      iceUntil: now + dur,
      nextIceAt: now + dur + rand(ICE.GAP_MIN, ICE.GAP_MAX),
      iceTelegraph: false,
    });
  }

  // 다음 빙판 시작 시간 계산
  const telegraphActive =
    w.surface !== "ice" &&
    w.nextIceAt - now <= ICE.TELEGRAPH &&
    w.nextIceAt - now > 0;

  if (w.iceTelegraph !== telegraphActive) {
    useWorld.setState({ iceTelegraph: telegraphActive });
  }
}
