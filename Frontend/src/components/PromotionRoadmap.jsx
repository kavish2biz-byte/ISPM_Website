// src/components/PromotionRoadmap.jsx
import React from 'react';
import styled from 'styled-components';

const Roadmap = styled.div`
  background:var(--white); padding:var(--space-lg);
  border-radius:var(--radius-md); box-shadow:var(--shadow-md);
  margin-top:var(--space-lg);
`;

const Step = styled.div`
  display:flex; align-items:center; gap:var(--space-md);
  &:not(:last-child) { margin-bottom:var(--space-lg); }
`;

const Dot = styled.div`
  width:16px; height:16px; border-radius:50%;
  background:var(--primary);
`;

const Line = styled.div`
  width:2px; height:40px; background:var(--border);
  margin-left:7px;
`;

const Content = styled.div``;
const Title = styled.div`font-weight:700; color:var(--primary);`;
const Desc = styled.div`font-size:0.875rem; color:var(--accent);`;

export default function PromotionRoadmap() {
  const steps = [
    {title:'Level 1: Awareness',desc:'Complete basic policy training'},
    {title:'Level 2: Practitioner',desc:'Earn 3 certificates'},
    {title:'Level 3: Specialist',desc:'Lead internal workshops'},
  ];
  return (
    <Roadmap>
      <h2>Road to Promotion</h2>
      {steps.map((s,i)=>(
        <React.Fragment key={i}>
          <Step>
            <Dot/>
            <Content>
              <Title>{s.title}</Title>
              <Desc>{s.desc}</Desc>
            </Content>
          </Step>
          {i<steps.length-1 && <Line/>}
        </React.Fragment>
      ))}
    </Roadmap>
  );
}
