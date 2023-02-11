// Released under the 2-Clause BSD license, copied from:
// https://github.com/hypothesis/client
//
// Copyright (c) 2013-2019 Hypothes.is Project and contributors
//
// Redistribution and use in source and binary forms, with or without
// modification, are permitted provided that the following conditions are met:
//
// 1. Redistributions of source code must retain the above copyright notice, this
//    list of conditions and the following disclaimer.
// 2. Redistributions in binary form must reproduce the above copyright notice,
//    this list of conditions and the following disclaimer in the documentation
//    and/or other materials provided with the distribution.
//
// THIS SOFTWARE IS PROVIDED BY THE COPYRIGHT HOLDERS AND CONTRIBUTORS "AS IS" AND
// ANY EXPRESS OR IMPLIED WARRANTIES, INCLUDING, BUT NOT LIMITED TO, THE IMPLIED
// WARRANTIES OF MERCHANTABILITY AND FITNESS FOR A PARTICULAR PURPOSE ARE
// DISCLAIMED. IN NO EVENT SHALL THE COPYRIGHT OWNER OR CONTRIBUTORS BE LIABLE FOR
// ANY DIRECT, INDIRECT, INCIDENTAL, SPECIAL, EXEMPLARY, OR CONSEQUENTIAL DAMAGES
// (INCLUDING, BUT NOT LIMITED TO, PROCUREMENT OF SUBSTITUTE GOODS OR SERVICES;
// LOSS OF USE, DATA, OR PROFITS; OR BUSINESS INTERRUPTION) HOWEVER CAUSED AND
// ON ANY THEORY OF LIABILITY, WHETHER IN CONTRACT, STRICT LIABILITY, OR TORT
// (INCLUDING NEGLIGENCE OR OTHERWISE) ARISING IN ANY WAY OUT OF THE USE OF THIS
// SOFTWARE, EVEN IF ADVISED OF THE POSSIBILITY OF SUCH DAMAGE.

/**
 * Helper methods to identify browser versions and os types
 */

/**
 * Returns true when the OS is Mac OS.
 *
 * @param _userAgent {string} - Test seam
 */
export const isMacOS = (_userAgent = window.navigator.userAgent) => {
    return _userAgent.indexOf('Mac OS') >= 0;
  };
  
  /**
   * Returns true when device is iOS.
   * https://stackoverflow.com/a/9039885/14463679
   *
   * @param _navigator {{platform: string, userAgent: string}}
   * @param _ontouchend {boolean}
   */
  export const isIOS = (
    _navigator = window.navigator,
    _ontouchend = 'ontouchend' in document
  ) => {
    return (
      [
        'iPad Simulator',
        'iPhone Simulator',
        'iPod Simulator',
        'iPad',
        'iPhone',
        'iPod',
      ].includes(_navigator.platform) ||
      // iPad on iOS 13 detection
      (_navigator.userAgent.includes('Mac') && _ontouchend)
    );
  };
  
  /**
   * Returns true when the device is a touch device such
   * as android or iOS.
   * https://developer.mozilla.org/en-US/docs/Web/CSS/@media/pointer#browser_compatibility
   *
   * @param _window {Window} - Test seam
   */
  export const isTouchDevice = (_window = window) => {
    return _window.matchMedia('(pointer: coarse)').matches;
  };
