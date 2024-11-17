'use client'

import { useGSAP } from '@gsap/react'
import { Logo } from 'components'
import gsap from 'gsap'
import styled from 'styled-components'
import { NormalText, normalTheme } from 'styles'

const SectionWrapper = styled.div`
  display: flex;
  justify-content: center;
  flex-direction: column;
  color: rgb(${normalTheme.white});
  width: 22vw;
  gap: var(--space-s);
  /* background: linear-gradient(
    90deg,
    rgba(0, 0, 0, 1) 80%,
    rgba(0, 0, 0, 0.3996192226890757) 100%
  ); */

  .anim-word {
    display: inline-block;
  }
`
const LogoWrapper = styled.div`
  width: 10vw;
  height: auto;

  svg {
    width: 100%;
    height: 100%;
  }
`
const LinkWrapper = styled.div`
  display: flex;
  flex-direction: column;
  gap: var(--space-3xs);

  .anim-link {
    display: inline-block;
    color: rgb(${normalTheme.white});
    text-decoration: none;
    width: fit-content;

    &:hover {
      opacity: 0.8;
    }
  }
`
const Overflow = styled.span`
  overflow: hidden;
  display: inline-block;
`

const TEXT = `Multidisciplinary designer based in Brooklyn, NY pursuing a BFA in Communications Design at Pratt Institute. Focusing on branding andpreviously worked at dentsu.`

const TextElem = ({ hideText }) => {
  useGSAP(() => {
    console.log(hideText)
    if (hideText) {
      gsap.to(gsap.utils.toArray('.anim-word'), {
        yPercent: 100,
        stagger: 0.01,
        duration: 1,
      })
      gsap.to(gsap.utils.toArray('.anim-link'), {
        yPercent: 100,
        stagger: 0.02,
        duration: 1,
      })
      gsap.to('.anim-logo', { opacity: 0, duration: 1 })
    } else {
      gsap.to(gsap.utils.toArray('.anim-word'), {
        yPercent: 0,
        stagger: 0.01,
        duration: 1,
        delay: 0.5,
      })
      gsap.to(gsap.utils.toArray('.anim-link'), {
        yPercent: 0,
        stagger: 0.02,
        duration: 1,
        delay: 0.5,
      })
      gsap.to('.anim-logo', { opacity: 1, duration: 1, delay: 0.5 })
    }
  }, [hideText])

  return (
    <SectionWrapper className="anim-section">
      <LogoWrapper className="anim-logo">
        <Logo />
      </LogoWrapper>
      <NormalText>
        {TEXT.split(' ').map((word, i) => (
          <Overflow>
            <span className="anim-word" key={i}>
              {word}&nbsp;
            </span>
          </Overflow>
        ))}
      </NormalText>
      <LinkWrapper>
        <Overflow>
          <a href="/" className="anim-link">
            Archive
          </a>
        </Overflow>
        <Overflow>
          <a href="/" className="anim-link">
            About
          </a>
        </Overflow>
        <Overflow>
          <a href="/" className="anim-link">
            Contact
          </a>
        </Overflow>
        <Overflow>
          <a href="/" className="anim-link">
            Email
          </a>
        </Overflow>
        <Overflow>
          <a href="/" className="anim-link">
            LinkedIn
          </a>
        </Overflow>
        <Overflow>
          <a href="/" className="anim-link">
            Instagram
          </a>
        </Overflow>
      </LinkWrapper>
    </SectionWrapper>
  )
}

export default TextElem
