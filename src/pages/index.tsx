import { GetStaticProps, InferGetStaticPropsType } from 'next'

import { About } from '~/components/home/About'
import { Contact } from '~/components/home/Contact'
import { Hero } from '~/components/home/Hero'
import { Projects } from '~/components/home/Projects'
import { Technologies } from '~/components/home/Technologies'
import { Layout } from '~/components/Layout'
import { getAboutPage, getContact, type Page } from '~/lib/page.queries'
import { getProjects, type Project } from '~/lib/project.queries'
import { getTechnologies, type Technology } from '~/lib/technology.queries'

export default function IndexPage({
  about,
  contact,
  projects,
  technologies,
}: InferGetStaticPropsType<typeof getStaticProps>) {
  return (
    <Layout>
      <Hero />
      <About about={about} />
      <Projects projects={projects} />
      <Technologies technologies={technologies} />
      <Contact body={contact} />
    </Layout>
  )
}

export const getStaticProps: GetStaticProps<{
  about: Page
  contact: string
  projects: Project[]
  technologies: Technology[]
}> = async () => {
  const about = getAboutPage()

  if (!about) {
    return {
      notFound: true,
    }
  }

  return {
    props: {
      about,
      contact: getContact(),
      projects: getProjects(),
      technologies: getTechnologies(),
    },
  }
}
