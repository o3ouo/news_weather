import react from "react";

export default function Popup({ setOpenPopup }) {

  const close = () => {
    setOpenPopup(false);
    document.body.style.overflow = "unset";
  }

  return (
    <div className="popup-bg">
      <div className="popup">
        <figure className="pop-img">
          <img src={`${process.env.PUBLIC_URL}/img/jujutsu_kaisen_logo.png`} alt="game-logo" />
        </figure>

        <div className="pop-text">
          <h3 className="pop-title">🎮 PLAY 방법 🎮</h3>
          <p className="txt-target">
            화면에 나타나는 캐릭터를 클릭하여 최대한 많은 점수를 획득하세요.
          </p>
          <div className="score-box-list">
            <div className="score-box">
              <span>5점</span>
              <figure>
                <img src={`${process.env.PUBLIC_URL}/img/gojo01.png`} alt="gojo" />
              </figure>
            </div>
            <div className="score-box">
              <span>4점</span>  
              <figure>
                <img src={`${process.env.PUBLIC_URL}/img/yuta01.png`} alt="yuta" />
              </figure>
              <figure>
                <img src={`${process.env.PUBLIC_URL}/img/toge01.png`} alt="toge" />
              </figure>
            </div>
            <div className="score-box">
              <span>3점</span>
              <figure>
                <img src={`${process.env.PUBLIC_URL}/img/maki01.png`} alt="maki" />
              </figure>
              <figure>
                <img src={`${process.env.PUBLIC_URL}/img/panda01.png`} alt="panda" />
              </figure>
            </div>
            <div className="score-box">
              <span>2점</span>
              <figure>
                <img src={`${process.env.PUBLIC_URL}/img/yuji01.png`} alt="yuji" />
              </figure>
              <figure>
                <img src={`${process.env.PUBLIC_URL}/img/megumi01.png`} alt="megumi" />
              </figure>
            </div>
            <div className="score-box">
              <span>1점</span>
              <figure>
                <img src={`${process.env.PUBLIC_URL}/img/nobara01.png`} alt="nobara" />
              </figure>
            </div>

          </div>
          <p className="txt">1️⃣ 빠르게 클릭하세요!</p>
          <p className="txt">2️⃣ 캐릭터는 랜덤하게 등장하며, 캐릭터에 따라 다른 점수를 획득합니다! </p>
          <p className="txt">3️⃣ 제한 시간 내에 최대한 많은 캐릭터를 클릭하세요!</p>
          <p className="txt">4️⃣ 시간이 다하면 게임이 자동으로 종료되며, 최종 점수를 확인하세요!</p>

          <p className="txt-tip">
            🔹 Tip! 빠른 반응 속도가 높은 점수를 얻는 열쇠입니다. <br />
            캐릭터의 위치를 빠르게 파악하고 클릭하세요!
          </p>
        </div>

        <button type="button" className="closeBtn" onClick={close}>CLOSE</button>
      </div>
    </div>
  );
}