import React from 'react';
import Config from '../../Config';
import pfnLogo from '../../img/PFN_logo.png';

const About = () => (
  <div className="about">

    <h3 style={{ color: Config.colors.theme }}>Site Authors</h3>
    <p> Yanghua Jin / yanghuajin94@gmail.com /<a href="https://twitter.com/namaniku0" target="_blank" rel="noopener noreferrer">Aixile</a> (Fudan University/Preferred Networks)                                                                         </p>
    <p> Jiakai Zhang / zhangjk95@gmail.com (Carnegie Mellon University)</p>
    <h3 style={{ color: Config.colors.theme }}>Technical Report</h3>
    <a href="https://makegirlsmoe.github.io/assets/pdf/technical_report.pdf" target="_blank" rel="noopener noreferrer">Create Anime Characters with A.I. ! </a> <br />
                First publised as a Doujinshi on <a href="http://www.comiket.co.jp/" target="_blank" rel="noopener noreferrer"> Comiket</a> 92, Summer 2017<br />
                ガールス・マニホールド　三日目東ウ05a
                <h4 style={{ color: Config.colors.theme }} >Technical Report Authors </h4>
    <p> Yanghua Jin, Minjun Li, Yingtao Tian, Huachun Zhu</p>
    <h4 style={{ color: Config.colors.theme }} >Cover Design</h4>
    <p>Zhihao Fang </p>
    <div style={{ color: Config.colors.theme }} />
    <h3 style={{ color: Config.colors.theme }}>Special Thanks</h3>
    <p>Eiichi Matsumoto, Taizan Yonetsuji, Saito Masaki, Kosuke Nakago (Preferred Networks)</p>
    <p>Thanks to <a href="https://www.preferred-networks.jp/" target="_blank" rel="noopener noreferrer" style={{ color: '#0060de', fontSize: '18' }}><img src={pfnLogo} width="24" alt="PFN Logo" /> Preferred Networks</a></p>
    <h3 style={{ color: Config.colors.theme }}>License</h3>
    <p> The web interface is under the GPLv3 license. </p>
    <p> Model training scripts are under the MIT license. (Available Soon) </p>

    <h3 style={{ color: Config.colors.theme }}>Links</h3>
    <h5><a href="https://chainer.org" target="_blank" rel="noopener noreferrer">Chainer</a></h5>
    <h5><a href="https://mil-tokyo.github.io/webdnn/" target="_blank" rel="noopener noreferrer">WebDNN</a></h5>

  </div>
);

export default About;
