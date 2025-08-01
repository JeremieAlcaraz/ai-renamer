import * as changeCase from 'https://deno.land/x/case/mod.ts'

export default ({ text, _case }: { text: string, _case: string }) => {
  try {
    return (changeCase as any)[_case](text)
  } catch (err) {
    return changeCase.kebabCase(text)
  }
}
