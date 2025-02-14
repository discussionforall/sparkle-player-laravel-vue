import { screen } from '@testing-library/vue'
import { expect, it } from 'vitest'
import UnitTestCase from '@/__tests__/UnitTestCase'
import Form from './ActivateLicenseForm.vue'

new class extends UnitTestCase {
  protected test () {
    it('activates license', async () => {
      this.renderComponent()

      await this.type(screen.getByRole('textbox'), 'my-license-key')
      await this.user.click(screen.getByText('Activate'))
    })
  }

  private renderComponent () {
    return this.render(Form)
  }
}
