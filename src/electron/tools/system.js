// DreamTime.
// Copyright (C) DreamNet. All rights reserved.
//
// This program is free software: you can redistribute it and/or modify
// it under the terms of the GNU General Public License 3.0 as published by
// the Free Software Foundation.
//
// You should have received a copy of the GNU General Public License
// along with this program. If not, see <https://www.gnu.org/licenses/>.
//
// Written by Ivan Bravo Bravo <ivan@dreamnet.tech>, 2019.


const si = require('systeminformation')
const _ = require('lodash')

/**
 * Returns a list of compatible GPUs.
 */
export const graphics = async () => {
  const payload = await si.graphics()
  return _.filter(payload.controllers, { vendor: 'NVIDIA' })
}
