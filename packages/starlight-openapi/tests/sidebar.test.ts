import { expect, test } from './test'

test('lists operations grouped by tag', async ({ sidebarPage }) => {
  await sidebarPage.goto()

  const items = await sidebarPage.getSidebarGroupItems('Petstore v3.0')

  expect(items).toMatchObject([
    { name: 'Overview' },
    {
      label: 'pets',
      items: [{ name: 'List all pets' }, { name: 'Create a pet' }, { name: 'Info for a specific pet' }],
    },
  ])
})

test('uses a fallback group for untagged operations', async ({ sidebarPage }) => {
  await sidebarPage.goto()

  const items = await sidebarPage.getSidebarGroupItems('Petstore v3.0 (expanded)')

  expect(items).toMatchObject([
    { name: 'Overview' },
    {
      label: 'Operations',
      items: [{ name: 'findPets' }, { name: 'addPet' }, { name: 'find pet by id' }, { name: 'deletePet' }],
    },
  ])
})

test('respects tags order', async ({ sidebarPage }) => {
  await sidebarPage.goto()

  const items = await sidebarPage.getSidebarGroupItems('Animals v3.0')

  expect(items).toMatchObject([
    { name: 'Overview' },
    {
      label: 'places',
    },
    {
      label: 'animals',
    },
    {
      label: 'Webhooks',
    },
  ])
})

test('lists webhooks', async ({ sidebarPage }) => {
  await sidebarPage.goto()

  const items = await sidebarPage.getSidebarGroupItems('Animals v3.0')

  expect(items).toMatchObject([
    { name: 'Overview' },
    {
      label: 'places',
    },
    {
      label: 'animals',
    },
    {
      label: 'Webhooks',
      items: [{ name: 'New animal' }, { name: 'newCat' }],
    },
  ])
})

test('renders remote schemas', async ({ sidebarPage }) => {
  await sidebarPage.goto()

  const items = await sidebarPage.getSidebarGroupItems('Link v3.0')

  expect(items).toMatchObject([
    { name: 'Overview' },
    {
      label: 'Operations',
      items: [
        { name: 'getUserByName' },
        { name: 'getRepositoriesByOwner' },
        { name: 'getRepository' },
        { name: 'getPullRequestsByRepository' },
        { name: 'getPullRequestsById' },
        { name: 'mergePullRequest' },
      ],
    },
  ])
})
