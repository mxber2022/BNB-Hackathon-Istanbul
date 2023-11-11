import styled from '@emotion/styled';
import HomeList from '../components/home/Index';
import { Flex } from '@totejs/uikit';
import Bg from '../images/bg.png';
import GithubIcon from '../components/svgIcon/GithubIcon';
import { DocIcon, FullTeamIcon, LinkArrowIcon } from '@totejs/icons';
import DiscordIcon from '../components/svgIcon/DiscordIcon';
import BSCIcon from '../components/svgIcon/BSCIcon';
import { Client } from '@bnb-chain/greenfield-js-sdk';
import { client, selectSp } from '../client/index';
import { useAccount } from 'wagmi';
import { useState } from 'react';
import { getOffchainAuthKeys } from '../utils/offchainAuth';

const Home = () => {

  const { address, connector } = useAccount();
  console.log("address: ", address);
  const [createBucketInfo, setCreateBucketInfo] = useState<{
    bucketName: string;
  }>({
    bucketName: '',
  });


  return (
    <Container flexDirection={'column'} alignItems={'center'}>
      <BannerInfo>
        <img src={Bg} alt="" />
        <Info flexDirection={'column'} gap={26}>
          <Title>
            DECENTRALIZED<br></br> FORM MARKETPLACE
          </Title>
          {/* <SubTitle>
            A Best Practice of BNB Greenfield Cross Chain Programmable Ability.
          </SubTitle> */}
        </Info>
      </BannerInfo>
      <HomeList></HomeList>


      <WorkInfo flexDirection={'column'} gap={37}>
        <WorkMainTitle>SUBMIT RESPONSE</WorkMainTitle>
        <h2>BNB ISTANBUL</h2>
        <iframe src="https://docs.google.com/forms/d/e/1FAIpQLSet6XlbvDKJSEkMb46NXUDsp8wenBCAiCbXflVg1FNBdTEy_g/viewform?embedded=true" width="640" height="824" >Loading…</iframe>
        {/* <button onClick={uploadToGreenfield}>Upload to Greenfield</button> */}





          {/* Bucket creation starts */}

        <h4>Create Bucket</h4> bucket name :
        <input value={createBucketInfo.bucketName} placeholder="bucket name" onChange={(e) => { setCreateBucketInfo({ ...createBucketInfo, bucketName: e.target.value }); }} />
        <br />  

        <button
        onClick={async () => {
          if (!address) return;

          const spInfo = await selectSp();
          console.log('spInfo', spInfo);

          const provider = await connector?.getProvider();
          const offChainData = await getOffchainAuthKeys(address, provider);
          if (!offChainData) {
            alert('No offchain, please create offchain pairs first');
            return;
          }

          const createBucketTx = await client.bucket.createBucket(
            {
              bucketName: createBucketInfo.bucketName,
              creator: address,
              visibility: 'VISIBILITY_TYPE_PUBLIC_READ',
              chargedReadQuota: '0',
              spInfo: {
                primarySpAddress: spInfo.primarySpAddress,
              },
              paymentAddress: address,
            },
            {
              // type: 'ECDSA',
              // privateKey: ACCOUNT_PRIVATEKEY,
              type: 'EDDSA',
              domain: window.location.origin,
              seed: offChainData.seedString,
              address,
            },
          );

          const simulateInfo = await createBucketTx.simulate({
            denom: 'BNB',
          });

          console.log('simulateInfo', simulateInfo);

          const res = await createBucketTx.broadcast({
            denom: 'BNB',
            gasLimit: Number(simulateInfo?.gasLimit),
            gasPrice: simulateInfo?.gasPrice || '5000000000',
            payer: address,
            granter: '',
          });

          if (res.code === 0) {
            alert('success');
          }
        }}
      >
        broadcast with simulate
      </button>







        {/*
            option1 : Create Bucket -> upload data to bucket

            option2 : Check for existing bucket and upload to user selected bucket

            List all the buckets
        */}



        <WorkItem flexDirection={'column'} gap={20}>
          <WorkTitle>Backendless Framework </WorkTitle>
          <WorkDesc>
            Data-marketplace fully utilizes smart contracts, greenfield APIs,
            and pre-defined rules to avoid complex backend deployments,
            simplifying the deployment process to the extreme.
          </WorkDesc>
        </WorkItem>
        <WorkItem flexDirection={'column'} gap={20}>
          <WorkTitle>Fully Greenfield Hosted Website</WorkTitle>
          <WorkDesc>
            The data-marketplace website is hosted by greenfield, no traditional
            cloud infrastructure，anti-Censorship.
          </WorkDesc>
        </WorkItem>
        <WorkItem flexDirection={'column'} gap={20}>
          <WorkTitle>Fully EVM Compatible</WorkTitle>
          <WorkDesc>
            Data-marketplace has implemented smart contracts using Solidity,
            which are deployed on the BSC network. Users/developers on any BSC
            don't even need to be aware of Greenfield's existence, and don't
            need to hold any tokens on Greenfield in order to purchase and
            access data.
          </WorkDesc>
        </WorkItem>
        <WorkItem flexDirection={'column'} gap={20}>
          <WorkTitle>Ultimate Fast Trading Experience</WorkTitle>
          <WorkDesc>
            Thanks to the fast blocking time of Greenfield and BSC, users can
            complete data listing and trading in seconds.
          </WorkDesc>
        </WorkItem>
      </WorkInfo>


      <Cards
        alignItems={'center'}
        justifyContent={'center'}
        flexDirection={'column'}
        gap={50}
      >
        <TitleCon flexDirection={'column'} alignItems={'center'} gap={20}>
          <CardTitle>Connect with us</CardTitle>
          <CardSubTitle>
            We are striving to provide actual value to the ecosystem, based on problems we identify in our own lives
          </CardSubTitle>
        </TitleCon>
        <CardCon gap={18}>
          <a href="https://greenfield.bnbchain.org/en" target="_blank">
            <CardItem alignItems={'center'} gap={16} flexDirection={'column'}>
              <BSCIcon w={32} h={32} className="icon"></BSCIcon>
              <CardItemTitle className="title">
                BNB Greenfield<br></br>Website
              </CardItemTitle>
            </CardItem>
          </a>
          <a
            href="https://github.com/mxber2022/BNB-Hackathon-Istanbul"
            target="_blank"
          >
            <CardItem alignItems={'center'} gap={16} flexDirection={'column'}>
              <DocIcon w={32} h={32} className="icon"></DocIcon>
              <CardItemTitle className="title">Documentations</CardItemTitle>
            </CardItem>
          </a>
          <a
            href="https://github.com/mxber2022/BNB-Hackathon-Istanbul"
            target="_blank"
          >
            <CardItem alignItems={'center'} gap={16} flexDirection={'column'}>
              <GithubIcon w={26} h={26} className="icon"></GithubIcon>
              <CardItemTitle className="title">Github</CardItemTitle>
            </CardItem>
          </a>
          <a href="https://forum.sentinal.org/" target="_blank">
            <CardItem alignItems={'center'} gap={16} flexDirection={'column'}>
              <FullTeamIcon w={32} h={32} className="icon"></FullTeamIcon>
              <CardItemTitle className="title">Forum</CardItemTitle>
            </CardItem>
          </a>
          <a href="https://discord.gg/sentinal" target="_blank">
            <CardItem alignItems={'center'} gap={16} flexDirection={'column'}>
              <DiscordIcon w={32} h={32} className="icon"></DiscordIcon>
              <CardItemTitle className="title">Discord</CardItemTitle>
            </CardItem>
          </a>
        </CardCon>
      </Cards>
    </Container>
  );
};

export default Home;

const Container = styled(Flex)`
  margin-top: -80px;
  width: 100%;
  background-color: #1e2026;
`;

const BannerInfo = styled.div`
  position: relative;
  width: 100%;
  height: 564px;
  background-color: #000;
  img {
    position: absolute;
    min-width: 1440px;
    height: 564px;
    right: 0;
  }
`;

const Info = styled(Flex)`
  position: absolute;
  top: 228px;
  left: 148px;
`;

const Title = styled.div`
  font-size: 58px;
  font-weight: 400;
  line-height: 58px;
  font-family: 'Zen Dots';
`;

const SubTitle = styled.div`
  font-size: 24px;
  font-weight: 400;
  color: #b9b9bb;
`;

const GithubCon = styled(Flex)`
  cursor: pointer;
  color: #f0b90b;
  .githubIcon {
    color: #cc9d09;
  }
  .arrow {
    color: #cc9d09;
  }
  &:hover {
    color: #f8d12f;
    .githubIcon {
      color: #f0b90b;
    }
    .arrow {
      color: #f0b90b;
    }
  }
`;

const WorkInfo = styled(Flex)`
  margin-top: 70px;
  width: 1200px;
  padding: 24px 40px;
`;

const WorkMainTitle = styled.div`
  text-align: center;
  font-size: 42px;
  font-weight: 700;
  color: #ffffff;
`;

const WorkItem = styled(Flex)``;

const WorkTitle = styled.div`
  font-size: 24px;
  font-weight: 700;
  color: #ffffff;
`;

const WorkDesc = styled.div`
  font-size: 18px;
  font-weight: 400;
  color: #b9b9bb;
`;

const Cards = styled(Flex)`
  margin: 80px 0 114px;
  background-color: #272727;
  width: 1200px;
  height: 426px;
  border-radius: 15px;
`;

const TitleCon = styled(Flex)``;

const CardTitle = styled.div`
  font-size: 34px;
  font-weight: 700;
  color: #ffffff;
`;

const CardSubTitle = styled.div`
  font-size: 20px;
  font-weight: 400;
  color: #b9b9bb;
`;

const CardCon = styled(Flex)``;

const CardItem = styled(Flex)`
  text-align: center;
  width: 190px;
  height: 140px;
  border-radius: 8px;
  background-color: #1f2026;
  line-height: 28px;
  .icon {
    margin-top: 22.3px;
  }
  .title {
    color: #fff;
  }
  &:hover {
    background-color: #fff;

    .icon {
      margin-top: 22.3px;
      color: #aeafb0;
    }
    .title {
      color: #535458;
    }
  }
`;

const CardItemTitle = styled.div`
  font-size: 16px;
  font-weight: 700;
  color: #fff;
`;
