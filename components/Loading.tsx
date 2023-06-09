/**
 * @module components/Loading
 *
 *
 * @author montier.elliott@gmail.com
 */
import Image from "next/image";
import styled from "styled-components";
import { PropagateLoader } from "react-spinners";

import Logo from "../public/logo.png";

/**
 * Loading component
 * 
 * 
 * @component
 * @returns {JSX.Element}
 */
const Loading = (): JSX.Element => {
  return (
    <center style={{ display: "grid", placeItems: "center", height: "100vh" }}>
      <LoaderContainer>
        <Image priority={true} src={Logo} width={200} height={200} alt="" />
        <Loader size={25} color="#3CBC28" />
      </LoaderContainer>
    </center>
  );
};

/**
 * Styles
 *
 *
 */
const LoaderContainer = styled.div``;

const Loader = styled(PropagateLoader)`
  margin-top: 30px;
`;

/** exporting */
export default Loading;
