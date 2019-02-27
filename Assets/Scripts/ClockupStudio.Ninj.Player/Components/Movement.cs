using System.Collections;
using System.Collections.Generic;
using UnityEngine;

namespace ClockupStudio.Ninj.Player.Components
{
    /// <summary>
    /// Movement component control speed of game object.
    /// </summary>
    public class Movement : MonoBehaviour
    {
        public float Speed;
        public Vector2 Direction;

        /// <summary>
        /// Uses to track pressing button from player.
        /// </summary>
        public bool PressedMove;
    }

}
