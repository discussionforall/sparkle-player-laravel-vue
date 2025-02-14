import { arrayify } from '@/utils/helpers'
import { useAuthorization } from '@/composables/useAuthorization'

export const usePolicies = () => {
  const { currentUser, isAdmin } = useAuthorization()

  const currentUserCan = {
    editSong: (songs: MaybeArray<Song>) => {
      if (isAdmin.value) {
        return true
      }
      return arrayify(songs).every(song => song.owner_id === currentUser.value.id)
    },

    editPlaylist: (playlist: Playlist) => playlist.user_id === currentUser.value.id,
    uploadSongs: () => isAdmin.value,
    changeAlbumOrArtistThumbnails: () => isAdmin.value, // for Plus, the logic is handled in the backend
  }

  currentUserCan.editSongs = currentUserCan.editSong

  return {
    currentUserCan,
  }
}
