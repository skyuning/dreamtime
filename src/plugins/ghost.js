/*
 * DreamTime | (C) 2019 by Ivan Bravo Bravo <ivan@dreamnet.tech>
 *
 * This program is free software: you can redistribute it and/or modify
 * it under the terms of the GNU General Public License 3.0 as published by
 * the Free Software Foundation.
 *
 * You should have received a copy of the GNU General Public License
 * along with this program. If not, see <https://www.gnu.org/licenses/>.
 */

import GhostContentAPI from '@tryghost/content-api'
import { app } from '~/modules'

export default async (ctx, inject) => {
  // Create API instance with site credentials
  const api = new GhostContentAPI({
    url: app.settings.keys ?.urls ?.blog || 'https://blog.dreamnet.tech',
    key: app.settings.keys ?.ghost || '76ea2aa898c5ca6ec003543499',
    version: 'v2',
  })

  inject('ghostApi', api)
}
