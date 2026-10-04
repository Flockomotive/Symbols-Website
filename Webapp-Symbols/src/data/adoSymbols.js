// [display name, file name in public/ado (without .svg)]
export const adoSymbols = [
  ['Azure DevOps', 'AzureDevOps'],
  ['Azure Pipelines', 'AzurePipelines'],
  ['Azure Repos', 'AzureRepos'],
  ['TFS Version Control Repository', 'TfsVcRepository'],
  ['Azure Artifacts', 'AzureArtifacts'],
  ['Git', 'Git'],
  ['Visual Studio', 'VisualStudio'],
  ['Microsoft Azure', 'MicrosoftAzure'],
  ['Package', 'Package'],
].map(([name, file]) => ({ name, url: `/ado/${file}.svg` }))
