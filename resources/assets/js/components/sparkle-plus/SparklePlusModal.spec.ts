import { screen } from '@testing-library/vue'
import { expect, it } from 'vitest'
import UnitTestCase from '@/__tests__/UnitTestCase'
import { commonStore } from '@/stores/commonStore'
// import Modal from './SparklePlusModal.vue'

new class extends UnitTestCase {
  protected test () {
    it('shows button to purchase Sparkle Plus', async () => {
      commonStore.state.sparkle.product_id = '42'
      // this.renderComponent()

      screen.getByTestId('buttons')
      expect(screen.queryByTestId('activateForm')).toBeNull()
      await this.user.click(screen.getByText('Purchase Sparkle Plus'))
      expect(globalThis.LemonSqueezy.Url.Open).toHaveBeenCalledWith(
        'https://store.sparkle.dev/checkout/buy/42?embed=1&media=0&desc=0',
      )
    })

    it('shows form to activate Sparkle Plus', async () => {
      commonStore.state.sparkle.product_id = '42'
      // this.renderComponent()
      await this.user.click(screen.getByText('I have a license key'))
      screen.getByTestId('activateForm')
    })
  }

  private renderComponent () {
    return ''
  }
}
