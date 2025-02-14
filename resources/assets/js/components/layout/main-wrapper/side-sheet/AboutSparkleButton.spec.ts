import { screen } from '@testing-library/vue'
import { expect, it } from 'vitest'
import UnitTestCase from '@/__tests__/UnitTestCase'
import { commonStore } from '@/stores/commonStore'
import AboutSparkleButton from './AboutSparkleButton.vue'

new class extends UnitTestCase {
  protected test () {
    it('shows no notification when no new available available', () => {
      commonStore.state.current_version = '1.0.0'
      commonStore.state.latest_version = '1.0.0'

      this.beAdmin().render(AboutSparkleButton)
      expect(screen.queryByTitle('New version available!')).toBeNull()
      expect(screen.queryByTestId('new-version-indicator')).toBeNull()
      screen.getByTitle('About Sparkle')
    })

    it('shows notification when new version available', () => {
      commonStore.state.current_version = '1.0.0'
      commonStore.state.latest_version = '1.0.1'

      this.beAdmin().render(AboutSparkleButton)
      screen.getByTitle('New version available!')
      screen.getByTestId('new-version-indicator')
    })

    it('doesn\'t show notification to non-admin users', () => {
      commonStore.state.current_version = '1.0.0'
      commonStore.state.latest_version = '1.0.1'

      this.be().render(AboutSparkleButton)
      expect(screen.queryByTitle('New version available!')).toBeNull()
      expect(screen.queryByTestId('new-version-indicator')).toBeNull()
      screen.getByTitle('About Sparkle')
    })
  }
}
