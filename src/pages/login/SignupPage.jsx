import styled from "styled-components";
import { useNavigate } from "react-router-dom";
import { useState } from "react";
import LoginAxios from "../../axiosapi/LoginAxios";
import emailjs from "emailjs-com";
import Modal from "../../common/utils/Modal";

const Contain = styled.div`
  width: auto;
  height: auto;
`;
const TitleDiv = styled.div`
  width: 24.6vw;
  height: 6.296vh;
  display: flex;
  justify-content: center;
  align-items: center;
  font-size: 1.198vw;
  font-weight: 900;
  color: #b44a4a;
`;
const InputDiv = styled.div`
  width: 24.6vw;
  height: 39.874vh;
  display: flex;
  flex-direction: column;
  justify-content: space-evenly;
  align-items: center;
`;
const InputDetailDiv = styled.div`
  width: 17.708vw;
  height: 3.358vh;

  display: flex;
  justify-content: end;
  & > label {
    width: 5.729vw;
    height: auto;
    font-size: 0.8vw;
    color: #b44a4a;
    display: flex;
    font-weight: bolder;
    justify-content: center;
    align-items: center;
  }
  & > .InputClass {
    width: 11.458vw;
    border-radius: 0.521vw;
    border: none;
    background-color: rgba(0, 0, 0, 0.3);
    outline: none;
    box-shadow: 0 6px 9px rgba(0, 0, 0, 0.3);
    padding-left: 0.521vw;
    font-size: 0.8vw;
    font-weight: 600;
  }
  & > .InputEmail {
    width: 8.333vw;
    border-radius: 0.521vw;
    border: none;
    background-color: rgba(0, 0, 0, 0.3);
    outline: none;
    box-shadow: 0 6px 9px rgba(0, 0, 0, 0.3);
    padding-left: 0.521vw;
    font-size: 0.8vw;
    font-weight: 600;
  }
  & > .InputCoupleName {
    width: 8.333vw;
    border-radius: 0.521vw;
    border: none;
    background-color: rgba(0, 0, 0, 0.3);
    outline: none;
    box-shadow: 0 6px 9px rgba(0, 0, 0, 0.3);
    padding-left: 0.521vw;
    font-size: 0.8vw;
    font-weight: 600;
  }
  & > .InputCode {
    width: 8.333vw;
    border-radius: 0.521vw;
    border: none;
    background-color: rgba(0, 0, 0, 0.3);
    outline: none;
    box-shadow: 0 6px 9px rgba(0, 0, 0, 0.3);
    padding-left: 0.521vw;
    font-size: 0.8vw;
    font-weight: 600;
  }
`;
const Empty = styled.div`
  width: 0.521vw;
`;
const EmailAthouized = styled.div`
  width: 2.604vw;
  border-radius: 0.521vw;
  border: none;
  background-color: ${({ isActive }) =>
    isActive ? "rgba(0, 0, 0, 0.3)" : "rgba(0, 0, 0, 0.2)"};
  outline: none;
  box-shadow: 0 6px 9px rgba(0, 0, 0, 0.3);
  padding-left: 0.208vw;
  display: flex;
  justify-content: center;
  align-items: center;
  font-size: 0.729vw;
  color: ${({ isActive }) => (isActive ? "#b44a4a" : "#ccc")};
  font-weight: 700;
  cursor: ${({ isActive }) => (isActive ? "pointer" : "not-allowed")};
  &:hover {
    background-color: ${({ isActive }) =>
      isActive ? "rgba(0, 0, 0, 0.3)" : "rgba(0, 0, 0, 0.2)"};
  }
`;
const RegisterationInput1 = styled.input`
  width: 6.771vw;
  border-radius: 0.521vw;
  border: none;
  background-color: rgba(0, 0, 0, 0.3);
  outline: none;
  box-shadow: 0 6px 9px rgba(0, 0, 0, 0.3);
  padding-left: 0.521vw;
  font-size: 0.833vw;
  font-weight: 600;
`;
const Text = styled.div`
  width: 0.521vw;
  height: 3.358vh;
  font-weight: bolder;
  font-size: 0.833vw;
  color: #b44a4a;
  display: flex;
  justify-content: center;
  align-items: center;
`;
const RegisterationInput2 = styled.input`
  width: 1.042vw;
  border-radius: 0.521vw;
  border: none;
  background-color: rgba(0, 0, 0, 0.3);
  outline: none;
  box-shadow: 0 6px 9px rgba(0, 0, 0, 0.3);
  padding-left: 0.208vw;
  font-size: 0.833vw;
  font-weight: 600;
`;
const CoupleText = styled.div`
  font-size: 0.729vw;
  color: #b44a4a;
  display: flex;
  align-items: center;
`;
const ButtonDiv = styled.div`
  width: 23.438vw;
  height: 11.962vh;
  display: flex;
  justify-content: center;
  align-items: center;
`;
const SignupButton = styled.div`
  width: 9.375vw;
  height: 5.247vh;
  background-color: ${({ isActive }) =>
    isActive ? "rgba(0, 0, 0, 0.4)" : "rgba(0, 0, 0, 0.2)"};
  border-radius: 1.042vw;
  font-weight: 600;
  font-size: 1.094vw;
  color: ${({ isActive }) => (isActive ? "#b44a4a" : "#ccc")};
  display: flex;
  justify-content: center;
  align-items: center;
  font-weight: border;
  cursor: ${({ isActive }) => (isActive ? "pointer" : "not-allowed")};
  &:hover {
    background-color: ${({ isActive }) =>
      isActive ? "rgba(0, 0, 0, 0.4)" : "rgba(0, 0, 0, 0.2)"};
  }
`;
const InputDetailDiv2 = styled.div`
  width: 17.708vw;
  height: 3.358vh;
  display: flex;
  justify-content: center;
`;
const Message = styled.div`
  width: 100%;
  font-size: 0.6vw;
  display: flex;
  justify-content: center;
  color: ${({ isCorrect }) => (isCorrect ? "green" : "red")};
`;
const TermsForm = styled.div`
  width: 30vw;
  height: 60vh;
  background-color: #fff;
  border: 5px solid #cefdce;
  border-radius: 10px;
  padding: 20px;
  position: absolute;
  display: ${({ isOpen }) => (isOpen ? "block" : "none")};
  overflow-y: auto;
`;

const TermsTitle = styled.div`
  font-size: 1.2vw; /* Adjust size as needed */
  font-weight: bold;
  margin-bottom: 10px;
`;

const TermsContent = styled.p`
  font-size: 0.8vw; /* Adjust size as needed */
  line-height: 1.4; /* Adjust line height for better readability */
  color: #333; /* Darker text color */
`;

const TermsActions = styled.div`
  margin-top: 20px;
  display: flex;
  justify-content: center;
  align-items: center;
  & > .termAgree {
    width: 10vw;
    height: auto;
  }
`;

const TermsCheckbox = styled.input`
  margin-right: 10px;
`;

const TermsLabel = styled.label`
  font-size: 0.8vw; /* Adjust size as needed */
`;

const TermsButton = styled.button`
  background-color: rgba(0, 0, 0, 0.4);
  color: white;
  border: none;
  border-radius: 5px;
  padding: 8px 16px;
  font-size: 0.9vw; /* Adjust size as needed */
  cursor: ${({ isActive }) => (isActive ? "pointer" : "not-allowed")};
  &:hover {
    background-color: ${({ isActive }) =>
      isActive ? "#8e3636" : "rgba(0, 0, 0, 0.2)"};
  }
`;

const TermsScrollableContent = styled.div`
  max-height: calc(100% - 100px);
  overflow-y: auto;
`;
const IsMyCoupleEmailForm = styled.div`
  width: 13vw;
  height: 12vh;
  background-color: #fff;
  border: 5px solid #cefdce;
  border-radius: 10px;
  position: absolute;
  display: ${({ isOpen }) => (isOpen ? "block" : "none")};
  overflow-y: auto;
  & > div > p {
    font-size: 15px;
    text-align: center;
  }
  & > .YesOrNo {
    width: auto;
    height: auto;
    display: flex;
    justify-content: space-evenly;
    align-items: center;
  }
`;
const SignupPage = () => {
  const navigate = useNavigate();
  // 키보드 입력
  const [inputEmail, setInputEmail] = useState("");
  const [inputPwd, setInputPwd] = useState("");
  const [inputPwdCheck, setInputPwdCheck] = useState("");
  // 유효성 확인
  const [isId, setIsId] = useState("");
  const [isPwd, setIsPwd] = useState("");
  const [isPwdCheack, setIsPwdCheck] = useState("");
  //이메일 보낸 후 상태 저장.
  const [isEmailSent, setIsEmailSent] = useState(false);
  //인증코드 저장
  const [saveCertificationCode, setSaveCertificationCode] = useState(null);
  //인증 확인 상태
  const [isEmail, setIsEmail] = useState(false);
  // 에러 메세지
  const [idMessage, setIdMessage] = useState("");
  const [pwdMessage, setPwMessage] = useState("");
  //비밀번호 확인 메세지
  const [pwdCheckMessage, setPwdCheckMessage] = useState("");
  //주민등록번호 표현 상태 변수
  const [rrnFirstPart, setRrnFirstPart] = useState("");
  const [rrnSecondPart, setRrnSecondPart] = useState("");
  // 유효한 주민등록번호인지 확인
  const [isRrnValid, setIsRrnValid] = useState(false);
  //주민등록번호 메세지
  const [isRrnValidMessage, setIsRrnValidMessage] = useState("");
  // 이름 입력
  const [inputName, setInputName] = useState("");
  // 닉네임 입력
  const [inputNickName, setInputNickName] = useState("");
  // 커플이름 입력
  const [inputCoupleName, setInputCoupleName] = useState("");
  // 커플 메세지
  const [coupleMessage, setCoupleMessage] = useState("");
  // 커플 중복 상태변수
  const [coupleNameDuplication, setCoupleNameDuplication] = useState(false);
  // 내 짝인지 확인하는 폼을 여는 상태 변수
  const [isMyCoupleEmailForm, setIsMyCoupleEmailForm] = useState(false);
  // 내 짝인지 확인하는 상태변수
  const [myCoupleEmail, setMyCoupleEmail] = useState(false);
  // 약관 보기 버튼 클릭 상태 변수
  const [isTermClickBtn, setIsTermClickBtn] = useState(false);
  // 약관 동의 체크 버튼
  const [isTermAccepted, setIsTermAccepted] = useState(false);
  // 모달 내용 변경
  const [modalContent, setModalContent] = useState("");
  // 모달 해더
  const [headerContents, SetHeaderContents] = useState("");
  //팝업 처리
  const [modalOpen, setModalOpen] = useState(false);
  const closeModal = () => {
    setModalOpen(false);
  };
  // 5~ 20자리의 영문자, 숫자, 언더스코어(_)로 이루어진 문자열이 유효한 아이디 형식인지 검사하는 정규표현식
  const onChangeEmail = (e) => {
    const emailRegex = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/;
    setInputEmail(e.target.value);
    if (!emailRegex.test(e.target.value)) {
      setIdMessage("이메일 형식이 올바르지 않습니다.");
      setIsId(false);
    } else {
      emailIsExist(e.target.value);
    }
  };
  // // 이메일 중복 체크하는 함수
  const emailIsExist = async (input) => {
    const response = await LoginAxios.emailIsExist(input);
    if (response.data) {
      setIdMessage("중복된 이메일입니다.");
      setIsId(false);
    } else {
      setIdMessage("올바른 형식 입니다.");
      setIsId(true);
    }
  };

  // 비밀번호 8자리 이상.
  const onChangePw = (e) => {
    const passwordRegex = /^(?=.*[a-zA-Z])(?=.*[0-9]).{8,25}$/;
    const passwordCurrent = e.target.value;
    setInputPwd(passwordCurrent);
    if (!passwordRegex.test(passwordCurrent)) {
      setPwMessage("숫자+영문자+특수문자 조합으로 8자리 이상 입력해주세요!");
      setIsPwd(false);
    } else {
      setPwMessage("안전한 비밀번호입니다.)");
      setIsPwd(true);
    }
  };
  // 비밀번호 일치 확인
  const onCheckPw = (e) => {
    const passwordInput = e.target.value;
    setInputPwdCheck(passwordInput);
    if (passwordInput !== inputPwd) {
      setPwdCheckMessage("일치하지 않습니다.");
      setIsPwdCheck(false);
    } else {
      setPwdCheckMessage("일치합니다.");
      setIsPwdCheck(true);
    }
  };
  //주민등록번호 앞 6자리 숫자 유효성검사
  const handleRrnFirstPartChange = (e) => {
    const inputValue = e.target.value;

    if (/^[0-9]*$/.test(inputValue) && inputValue.length <= 6) {
      setRrnFirstPart(inputValue);
    }

    // 유효성 검사 로직 추가
    if (inputValue.length === 6 && rrnSecondPart.length === 1) {
      setIsRrnValid(true);
      setIsRrnValidMessage("유효합니다.");
    } else {
      setIsRrnValid(false);
      setIsRrnValidMessage("값이 유효하지 않습니다.");
    }

    if (inputValue === "" && rrnSecondPart === "") {
      setIsRrnValidMessage("");
    }
  };
  //주민등록번호 뒤 1자리 숫자 유효성검사
  const handleRrnSecondPartChange = (e) => {
    const inputValue = e.target.value;

    if (/^[1-4]{0,1}$/.test(inputValue) && inputValue.length <= 1) {
      setRrnSecondPart(inputValue);
    }

    // 유효성 검사 로직 추가
    if (rrnFirstPart.length === 6 && inputValue.length === 1) {
      setIsRrnValid(true);
      setIsRrnValidMessage("유효합니다.");
    } else {
      setIsRrnValid(false);
      setIsRrnValidMessage("값이 유효하지 않습니다.");
    }

    if (inputValue === "" && rrnFirstPart === "") {
      setIsRrnValidMessage("");
    }
  };
  // 버튼 클릭 상태 업데이트
  const handleTermLookBtnClick = () => {
    setIsTermClickBtn(true);
  };

  // 체크박스 상태 업데이트
  const handleCheckboxChange = (e) => {
    setIsTermAccepted(e.target.checked);
  };

  // 동의 버튼 클릭 핸들러
  const handleAgreeButtonClick = () => {
    if (isTermAccepted) {
      setIsTermClickBtn(false);
    }
  };
  // 이름 변수에 저장
  const handleInputName = (e) => {
    setInputName(e.target.value);
  };
  // 닉네임 변수에 저장
  const handleInputNickName = (e) => {
    setInputNickName(e.target.value);
  };

  //주민등록번호 따로 받은 자리 합치는 함수
  const combineRRN = (firstPart, secondPart) => {
    // 문자열을 숫자로 변환
    const firstNum = parseInt(firstPart, 10);
    const secondNum = parseInt(secondPart, 10);

    // 계산 수행
    return firstNum * 10 + secondNum;
  };
  //회원가입 비동기 함수
  const signUpAxios = async (
    inputEmail,
    inputPwd,
    inputName,
    rrnFirstPart,
    rrnSecondPart,
    inputNickName,
    inputCoupleName
  ) => {
    const combinedRnn = combineRRN(rrnFirstPart, rrnSecondPart);
    try {
      const response = await LoginAxios.memberSignUp(
        inputEmail,
        inputPwd,
        inputName,
        combinedRnn,
        inputNickName,
        inputCoupleName
      );
      if (response.data === "Success" && isTermAccepted) {
        navigate("/login-page");
      }
    } catch (error) {
      console.log(error);
    }
  };

  // 회원가입 버튼을 클릭했을 경우 함수
  const signupBtnOnclickHandler = () => {
    signUpAxios(
      inputEmail,
      inputPwd,
      inputName,
      rrnFirstPart,
      rrnSecondPart,
      inputNickName,
      inputCoupleName
    );
  };
  //커플이름 onChange 함수 (중복확인)
  const handleInputCoupleName = (e) => {
    //커플 이름 저장
    setInputCoupleName(e.target.value);
    //커플이름 중복확인 Axios
    coupleNameSearchAxios(e.target.value);
  };
  // 커플이름 중복확인 비동기 함수
  const coupleNameSearchAxios = async (coupleName) => {
    const response = await LoginAxios.coupleNameSearch(coupleName);
    // 중복된 커플이름이 있는 경우
    if (response.data) {
      setCoupleMessage("커플 이름이 존재합니다.");
      setCoupleNameDuplication(false); // 상태 메세지 빨간색
      // 신규 커플인 경우
    } else {
      setCoupleMessage("신규 등록가능합니다.");
      setCoupleNameDuplication(true); // 상태 메세지 녹색
    }
  };
  // 커플이름 등록 버튼 함수
  const coupleNameBtnOnClickHandler = () => {
    // 신규 커플 등록
    if (coupleNameDuplication === true) {
      coupleNameInsertAxois(inputEmail, inputCoupleName);
      //등록 모달창
      setModalOpen(true);
      SetHeaderContents("커플등록");
      setModalContent("등록되었습니다.");
    }
    // 짝이 있는지 확인
    else {
      coupleEmailCheck(inputCoupleName);
      setIsMyCoupleEmailForm(true);
    }
  };
  //커플이름 Insert 비동기 함수
  const coupleNameInsertAxois = async (email, coupleName) => {
    const response = await LoginAxios.coupleNameInsert(email, coupleName);
    console.log(response.data);
  };
  //커플이름 존재시 두번째계정 Insert 비동기 함수
  const secondCoupleNameInsertAxois = async (email, coupleName) => {
    const response = await LoginAxios.secondCoupleNameInsert(email, coupleName);
    console.log(response.data);
  };
  // 짝이 맞는 경우
  const isMyCoupleEmailYesHandler = () => {
    // 기존 짝이 있는 데이터에 계정 추가
    secondCoupleNameInsertAxois(inputEmail, inputCoupleName);
    setIsMyCoupleEmailForm(false);
    setCoupleNameDuplication(true);
    setCoupleMessage("연결되었습니다.");
  };
  // 짝이 아닌 경우
  const isMyCoupleEmailNoHandler = () => {
    setIsMyCoupleEmailForm(false);
  };
  // 짝 계정 불러오는 비동기 함수
  const coupleEmailCheck = async (coupleName) => {
    const response = await LoginAxios.coupleEmailCheck(coupleName);
    console.log(response.data);
    setMyCoupleEmail(response.data);
  };
  // 이메일 인증 버튼 handler
  const emailCertificationBtnHandler = () => {
    if (isId) {
      sendVerificationEmail(inputEmail);
    }
  };
  // 이메일 전송시 파라미터 넘기는 함수
  const sendVerificationEmail = async (toEmail) => {
    const certificationCode = Math.floor(Math.random() * 900000) + 100000; // 100000부터 999999까지의 난수 발생
    setSaveCertificationCode(certificationCode);
    // 이메일 보내기
    // 여기서 정의해야 하는 것은 위에서 만든 메일 템플릿에 지정한 변수({{ }})에 대한 값을 담아줘야 한다.
    const templateParams = {
      toEmail: toEmail, // 수신 이메일
      toName: "고객님",
      certificationCode: certificationCode,
    };
    try {
      const response = await emailjs.send(
        "service_7cipsqb", // 서비스 ID
        "service_7cipsqb", // 템플릿 ID
        templateParams,
        "VKzT47hXDU3sC3R13" // public-key
      );
      console.log("이메일이 성공적으로 보내졌습니다:", response);
      setIdMessage("이메일이 성공적으로 보내졌습니다!");
      setIsId(true);
      setIsEmailSent(true);
      // 이메일 전송 성공 처리 로직 추가
    } catch (error) {
      console.error("이메일 보내기 실패:", error);
      setIdMessage("이메일 보내기 실패했습니다!");
      setIsId(false);
      setIsEmailSent(false);
      // 이메일 전송 실패 처리 로직 추가
    }
  };
  // 코드 확인 버튼 이벤트
  const emailCertificationCodeOnClick = () => {
    SetHeaderContents("인증코드확인");
    setModalOpen(true);
    setModalContent("확인되었습니다.");
  };
  //코드 모달 확인
  const codeModalOkBtnHandler = () => {
    closeModal();
    setIsEmail(true);
  };
  return (
    <Contain>
      <TitleDiv>회원가입</TitleDiv>
      <Modal
        open={modalOpen}
        header={headerContents}
        type={true}
        confirm={codeModalOkBtnHandler}
      >
        {modalContent}
      </Modal>
      <InputDiv>
        <div>
          <InputDetailDiv>
            <label>이메일</label>
            <input
              className="InputEmail"
              value={inputEmail}
              onChange={onChangeEmail}
            />
            <Empty></Empty>
            <EmailAthouized
              isActive={isId}
              onClick={emailCertificationBtnHandler}
            >
              인증
            </EmailAthouized>
          </InputDetailDiv>
          {inputEmail && <Message isCorrect={isId}>{idMessage}</Message>}
        </div>
        {isEmailSent && (
          <InputDetailDiv>
            <label>인증코드</label>
            <input
              className="InputCode"
              value={saveCertificationCode}
              onChange={(e) => {
                setSaveCertificationCode(e.target.value);
              }}
            />
            <Empty></Empty>
            <EmailAthouized
              isActive={isEmailSent}
              onClick={emailCertificationCodeOnClick}
            >
              확인
            </EmailAthouized>
          </InputDetailDiv>
        )}
        <div>
          <InputDetailDiv>
            <label>비밀번호</label>
            <input
              type="password"
              className="InputClass"
              value={inputPwd}
              onChange={onChangePw}
            />
          </InputDetailDiv>
          {inputPwd && <Message isCorrect={isPwd}>{pwdMessage}</Message>}
        </div>
        <div>
          <InputDetailDiv>
            <label>비밀번호 확인</label>
            <input
              type="password"
              className="InputClass"
              value={inputPwdCheck}
              onChange={onCheckPw}
            />
          </InputDetailDiv>
          {inputPwdCheck && (
            <Message isCorrect={isPwdCheack}>{pwdCheckMessage}</Message>
          )}
        </div>
        <InputDetailDiv>
          <label>이름</label>
          <input
            className="InputClass"
            value={inputName}
            onChange={handleInputName}
          />
        </InputDetailDiv>
        <div>
          <InputDetailDiv>
            <label>주민등록번호</label>
            <RegisterationInput1
              pattern="[0~9]+"
              value={rrnFirstPart}
              onChange={handleRrnFirstPartChange}
            />
            <Text> - </Text>
            <RegisterationInput2
              pattern="[0~9]+"
              value={rrnSecondPart}
              onChange={handleRrnSecondPartChange}
            />
            <Text>*</Text>
            <Text>*</Text>
            <Text>*</Text>
            <Text>*</Text>
            <Text>*</Text>
            <Text>*</Text>
          </InputDetailDiv>
          <Message isCorrect={isRrnValid}>{isRrnValidMessage}</Message>
        </div>
        <InputDetailDiv>
          <label>닉네임</label>
          <input
            className="InputClass"
            value={inputNickName}
            onChange={handleInputNickName}
          />
        </InputDetailDiv>
        <div>
          <InputDetailDiv>
            <label>커플이름</label>
            <input
              className="InputCoupleName"
              value={inputCoupleName}
              onChange={handleInputCoupleName}
            />
            <Empty />
            {coupleNameDuplication ? (
              <EmailAthouized
                isActive={true}
                onClick={coupleNameBtnOnClickHandler}
              >
                등록
              </EmailAthouized>
            ) : (
              <EmailAthouized
                isActive={true}
                onClick={coupleNameBtnOnClickHandler}
              >
                연결
              </EmailAthouized>
            )}
          </InputDetailDiv>
          <IsMyCoupleEmailForm isOpen={isMyCoupleEmailForm}>
            <div>
              <p>"{myCoupleEmail}"님이 내 짝의 계정이 맞나요?</p>
            </div>
            <div className="YesOrNo">
              <EmailAthouized
                isActive={true}
                onClick={isMyCoupleEmailYesHandler}
              >
                Yes
              </EmailAthouized>
              <EmailAthouized
                isActive={true}
                onClick={isMyCoupleEmailNoHandler}
              >
                No
              </EmailAthouized>
            </div>
          </IsMyCoupleEmailForm>
          <Message isCorrect={coupleNameDuplication}>{coupleMessage}</Message>
        </div>
        <InputDetailDiv2>
          <CoupleText style={{ fontSize: "0.833vw", fontWeight: "600" }}>
            약관 보기
          </CoupleText>
          <Empty />
          <EmailAthouized isActive={true} onClick={handleTermLookBtnClick}>
            보기
          </EmailAthouized>
        </InputDetailDiv2>
        <TermsForm isOpen={isTermClickBtn}>
          <TermsScrollableContent>
            <TermsTitle>계정 사용에 관한 약관</TermsTitle>
            <TermsContent>
              1. **계정 생성 및 관리** <br />
              &nbsp;1.1. 회원은 본 약관에 동의하고, 본 서비스에서 제공하는
              절차에 따라 회원가입을 완료해야 합니다. <br />
              &nbsp;1.2. 회원은 본인의 이메일 주소를 사용하여 하나의 계정만을
              생성할 수 있습니다. <br />
              &nbsp;1.3. 회원은 본인의 계정 정보를 타인과 공유하거나 양도할 수
              없습니다. <br /> <br />
              2. **회원 정보의 정확성** <br />
              &nbsp;2.1. 회원은 회원가입 시 제공한 정보가 정확하고 최신 정보임을
              보장해야 합니다. <br />
              &nbsp;2.2. 회원정보가 변경된 경우, 회원은 즉시 본 서비스에 이를
              업데이트해야 합니다. <br /> <br />
              3. **계정 보안** <br />
              &nbsp;3.1. 회원은 본인의 계정 비밀번호를 안전하게 관리해야 하며,
              비밀번호 유출로 인한 모든 책임은 회원에게 있습니다. <br />
              &nbsp;3.2. 회원은 계정의 무단 사용을 인지한 경우 즉시 본 서비스에
              이를 통보해야 합니다. <br /> <br />
              4. **서비스 이용** <br />
              &nbsp;4.1. 회원은 본 서비스를 법령 및 본 약관에 따라 이용해야
              합니다.
              <br />
              &nbsp;4.2. 회원은 본 서비스를 이용하여 불법 행위, 타인의 권리를
              침해하는 행위를 해서는 안 됩니다. <br /> <br />
              5. **계정 정지 및 해지** <br />
              &nbsp;5.1. 회원이 본 약관을 위반한 경우, 본 서비스는 사전 통지
              없이 회원의 계정을 일시 정지하거나 해지할 수 있습니다. <br />
              &nbsp;5.2. 회원은 언제든지 본 서비스에 요청하여 계정을 해지할 수
              있습니다. <br /> <br />
              6. **책임 제한** <br />
              &nbsp;6.1. 본 서비스는 회원의 귀책사유로 인한 계정 사용 상의
              문제에 대해 책임을 지지 않습니다. <br />
              &nbsp;6.2. 본 서비스는 회원 간 또는 회원과 제 3자 간의 분쟁에 대해
              관여하지 않으며, 이에 대한 책임을 지지 않습니다. <br /> <br />
              7. **약관의 변경** <br />
              &nbsp;7.1. 본 서비스는 필요 시 본 약관을 변경할 수 있으며, 변경된
              약관은 회원에게 공지한 후 효력이 발생합니다. <br />
              &nbsp;7.2. 회원이 변경된 약관에 동의하지 않을 경우, 회원은 계정
              해지를 통해 이용 계약을 종료할 수 있습니다.
            </TermsContent>
          </TermsScrollableContent>
          <TermsActions>
            <div className="termAgree">
              <TermsCheckbox
                type="checkbox"
                checked={isTermAccepted}
                onChange={handleCheckboxChange}
              />
              <TermsLabel>약관에 동의합니다.</TermsLabel>
            </div>
            <TermsButton
              onClick={handleAgreeButtonClick}
              disabled={!isTermAccepted}
              isActive={isTermAccepted}
            >
              동의
            </TermsButton>
          </TermsActions>
        </TermsForm>
      </InputDiv>
      <ButtonDiv>
        <SignupButton
          isActive={
            isEmail &&
            isPwd &&
            isPwdCheack &&
            rrnFirstPart &&
            rrnSecondPart &&
            inputName &&
            inputNickName &&
            inputCoupleName &&
            isTermAccepted
          }
          onClick={signupBtnOnclickHandler}
        >
          가입하기
        </SignupButton>
      </ButtonDiv>
    </Contain>
  );
};

export default SignupPage;
